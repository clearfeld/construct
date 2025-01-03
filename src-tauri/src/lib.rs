use curl::easy::{Easy, List};
// use std::borrow::{Borrow, BorrowMut};
// use std::io::{stdout, Read, Write};
use std::time::Duration;
use std::{str, vec};
use url::Url;
use uuid::Uuid;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(serde::Serialize)]
struct HTTPAPIResponse {
    status_code: u32,
    content_type: String,

    request_size: u64,

    response_headers: Vec<String>,
    response_data_raw: Vec<u8>,
    response_data_string: String,
    response_size: f64,

    cookies: Vec<String>,

    network_local_address: String,
    network_remote_address: String,

    time_total: Duration,
    time_namelookup: Duration,
    time_connect: Duration,
    time_appconnect: Duration,
    time_pretransfer: Duration,
    time_starttransfer: Duration,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn http_request(
    method: &str,
    headers: &str,
    url: &str,
    body: &str,
    _cookies: &str,
) -> Result<HTTPAPIResponse, String> {
    let mut easy = Easy::new();

    // only should use this on path, query, and user info
    // will need to build a lot of helper functions to parse out the info
    // dont actually use on the entire url
    // let url_encode = easy.url_encode(url.as_bytes());
    // println!("{}, {}", url, url_encode);

    easy.url(
        // Setting - OFF
        url, // Setting - encode url automatically
            // url_encode.as_str()
    )
    .unwrap();

    match method {
        "GET" => easy.get(true).unwrap(),
        "POST" => easy.post(true).unwrap(),
        "PUT" => easy.put(true).unwrap(),
        "PATCH" => easy.custom_request("PATCH").unwrap(),
        "DELETE" => easy.custom_request("DELETE").unwrap(),

        "HEAD" => easy.nobody(true).unwrap(),
        "OPTIONS" => easy.custom_request("OPTIONS").unwrap(),

        "TRACE" => easy.custom_request("TRACE").unwrap(),
        "CONNECT" => easy.custom_request("CONNECT").unwrap(),

        // TODO: support custom requests from frontend first
        _ => easy.custom_request(method).unwrap(),
    }

    // TODO: finish setting up cookies frontend first
    // if !cookies.is_empty() {
    //     let mut cookie_list = List::new();
    //     for cookie in cookies.split(';') {
    //         cookie_list.append(cookie.trim()).unwrap();
    //     }
    //     easy.cookie_list(cookie_list).unwrap();
    // }

    //
    let url_parsed = match Url::parse(
        url, // or url_encoded depending
    ) {
        Ok(v) => v,
        Err(e) => return Err(e.to_string()),
    };

    let host_header = "Host: ".to_owned() + url_parsed.host_str().unwrap();
    let construction_token_header =
        "Construct-Token: ".to_owned() + Uuid::new_v4().to_string().as_str();

    let mut list = List::new();
    list.append("Cache-Control: no-cache").unwrap();
    list.append(construction_token_header.as_str()).unwrap();
    list.append(host_header.as_str()).unwrap();
    // TODO: need to filter this header and need to give UX warning to end user
    // list.append("User-Agent: ConstructRuntime/0.0.1").unwrap();
    list.append("Accept: */*").unwrap();
    // TODO: need to filter this header and need to give UX warning to end user
    // list.append("Accept-Encoding: gzip, deflate, br").unwrap();
    list.append("Connection: keep-alive").unwrap();

    if !headers.is_empty() {
        for header in headers.split(',') {
            list.append(header.trim()).unwrap();
        }
    }

    // Set content type header for JSON if body is not empty
    if !body.is_empty() {
        list.append("Content-Type: application/json").unwrap();
        easy.post_fields_copy(body.as_bytes()).unwrap();

        // TODO: check for the method to copy fields without settings post method
        match method {
            "GET" => easy.get(true).unwrap(),
            "POST" => easy.post(true).unwrap(),
            "PUT" => easy.put(true).unwrap(),
            "PATCH" => easy.custom_request("PATCH").unwrap(),
            "DELETE" => easy.custom_request("DELETE").unwrap(),

            "HEAD" => easy.nobody(true).unwrap(),
            "OPTIONS" => easy.custom_request("OPTIONS").unwrap(),

            "TRACE" => easy.custom_request("TRACE").unwrap(),
            "CONNECT" => easy.custom_request("CONNECT").unwrap(),

            // TODO: support custom requests from frontend first
            _ => easy.custom_request(method).unwrap(),
        }
    }

    easy.http_headers(list).unwrap();

    easy.useragent("ConstructRuntime/0.1.0").unwrap();

    // dirty evil lies that breaks my heart
    // easy.accept_encoding("gzip, deflate, br");
    // brotli encodings arent enabled with the rust libcurl so we cant demporess those automatically

    easy.accept_encoding("gzip, deflate").unwrap();

    // Setting - Automatically follow redirects
    easy.follow_location(true).unwrap();

    // Setting - Maximun number of redirects
    easy.max_redirections(10).unwrap();

    // if method == "POST" || method == "PUT" {
    // if !body.is_empty() {
    //     easy.post_fields_copy(body.as_bytes()).unwrap();
    // }

    // response
    let mut response_data_raw = Vec::new();
    // let mut response_data_string = Vec::new();
    let mut response_data_string: String = String::new();

    let mut response_headers = Vec::new();
    {
        let mut transfer = easy.transfer();

        transfer
            .write_function(|data| {
                response_data_raw.extend_from_slice(data);
                response_data_string.push_str(str::from_utf8(data).unwrap());

                Ok(data.len())
            })
            .unwrap();

        transfer
            .header_function(|header| {
                response_headers.push(str::from_utf8(header).unwrap().to_string());
                true
            })
            .unwrap();

        transfer.perform().unwrap();
    }

    let cookies = easy
        .cookies()
        .unwrap()
        .into_iter()
        .map(|c| String::from_utf8_lossy(c).into_owned())
        .collect::<Vec<String>>();

    // easy.perform().unwrap();

    Ok(HTTPAPIResponse {
        status_code: easy.response_code().unwrap(),
        content_type: easy.content_type().unwrap().unwrap().to_string(),

        // Should we calculate this on the frontend side or leave it up to curl to give us the amount sent?
        // this seems wrong
        request_size: easy.request_size().unwrap(),

        //
        response_headers: response_headers,
        response_data_string: response_data_string,
        response_data_raw: response_data_raw,
        response_size: easy.download_size().unwrap(),

        //
        cookies: cookies,

        // network
        network_local_address: easy.local_ip().unwrap().unwrap().to_string(),
        network_remote_address: easy.primary_ip().unwrap().unwrap().to_string(),

        // timings
        time_total: easy.total_time().unwrap(),
        time_namelookup: easy.namelookup_time().unwrap(), // dns lookup
        time_connect: easy.connect_time().unwrap(),       // TCP Handshake
        time_appconnect: easy.appconnect_time().unwrap(), // SSL Handshake
        time_pretransfer: easy.pretransfer_time().unwrap(), // Substract dns tcp and ssl from this to get socket init time - double check might be wrong on this
        time_starttransfer: easy.starttransfer_time().unwrap(), // transfer start

                                                            // redirect time, count, and url
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, http_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
