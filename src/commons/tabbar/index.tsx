import * as stylex from "@stylexjs/stylex";

import Tab from "./tab"; // , { type RequestType, type Status }

import { useRef
// 	, useState
} from "react";
import LeftArrow from "../../assets/arrow-left.svg?react";
import RightArrow from "../../assets/arrow-right.svg?react";
// import Plus from "../../assets/plus.svg?react";
// import DownArrow from "../../assets/arrow-down.svg?react";
// import EnvironmentDropdown from "./environment-dropdown";
import { Button } from "@controlkit/ui";
import useRequestStore from "@src/stores/request_store";

const scroll_amount = 12 * 16;

const styles = stylex.create({
	wrapper: {
		width: "100%",

		display: "flex",
		alignItems: "center",

		boxSizing: "border-box",

		backgroundColor: "#141414",
		borderBottom: "0.0625rem solid var(--main-border-color)",
		height: "var(--tabbar-height)",
	},

	button: {
		backgroundColor: "transparent",
		boxShadow: "none",

		borderRadius: 0,

		width: "2.5rem",

		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		":hover": {
			backgroundColor: "#0E0F10",
		},
	},

	tabsList: {
		display: "flex",
		gap: "0.125rem",
		overflowX: "scroll",
		scrollBehavior: "smooth",
		height: "calc(100% + 0.1875rem)",
	},

	optionsRow: {
		display: "flex",
	},

	leftBorder: {
		borderLeft: "1px solid #28292A",
	},
	rightBorder: {
		borderRight: "1px solid #28292A",
	},
});

function TabBar() {
	// const [activeIndex, setActiveIndex] = useState(-1);
	const scrollRef = useRef<HTMLDivElement>(null);

	const tabs = useRequestStore((state) => state.tabs);

	const scroll = (scrollOffset: number) => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft += scrollOffset;
		}
	};

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div
				style={{
					width: "100%",
					display: "flex",
				}}
			>
				<div {...stylex.props(styles.rightBorder)}>
					<Button
						// {...stylex.props(styles.button)}
						extend={styles.button}
						onClick={() => scroll(-scroll_amount)}
					>
						<LeftArrow height={16} width={16} />
					</Button>
				</div>

				<div
					style={{
						overflow: "hidden",
						width: "100%",
					}}
				>
					<div {...stylex.props(styles.tabsList)} ref={scrollRef}>
						{tabs.map((tab, index) => {
							const isLastItem = index === tabs.length - 1;

							return (
								<div
									key={`${tab.title}-${index}`}
									style={{
										display: "flex",
										gap: "0.125rem",
									}}
								>
									<Tab
										id={tab.id}
										status={tab.status}
										title={tab.title}
										tabType={tab.type}
										requestType={tab.requestType}
									/>

									{!isLastItem && (
										<div
											style={{
												borderLeft: "0.0625rem solid #28292A",
												borderRadius: "0.25rem",
												height: "1.25rem",
												marginTop: "0.4375rem",
												// padding: "0.0625rem",
												// margin: "0.375rem 0 10.25rem 0",
											}}
										/>
									)}
								</div>
							);
						})}
					</div>
				</div>

				<div {...stylex.props(styles.leftBorder, styles.optionsRow)}>
					<Button extend={styles.button} onClick={() => scroll(scroll_amount)}>
						<RightArrow />
					</Button>

					{/* <Button extend={styles.button}>+ */}
					{/* <Plus /> */}
					{/* </Button> */}

					{/* <Button extend={styles.button}>D */}
					{/* <DownArrow /> */}
					{/* </Button> */}
				</div>
			</div>

			{/* <EnvironmentDropdown /> */}
		</div>
	);
}

export default TabBar;
