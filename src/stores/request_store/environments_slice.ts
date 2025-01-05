import type { StateCreator } from "zustand";
// TODO: replace with uuid v7 when possible
import { v4 as uuidv4 } from "uuid";

export type T_ActiveEnvironmentSliceItem =
	| "GLOBAL"
	| "VAULT"
	| "ENVIRONMENT"
	| null;

export type T_ActiveEnvironment = {
	env_id: string | null;
	stage_id: string | null;
};

export type T_ManagedVariable = {
	id: string;
	key: string;
	description: string;
	enabled: boolean;
	secret: boolean;
	initial_value: string;
	current_value: string;
};

export type T_EnvironmentStageVariable = {
	id: string;
	value: string;
};

export type T_EnvironmentStage = {
	id: string;
	env_id: string;
	name: string;
	description: string;

	variables: T_EnvironmentStageVariable[];
};

export type T_Environment = {
	id: string;
	name: string;

	variables: T_ManagedVariable[];
	stages: T_EnvironmentStage[];
};

export interface EnvironmentsSlice {
	activeEnvironmentSliceItem: T_ActiveEnvironmentSliceItem;
	setActiveEnvironmentSliceItem: (item: T_ActiveEnvironmentSliceItem) => void;
	getActiveEnvironmentSliceItem: () => T_ActiveEnvironmentSliceItem;

    enabledEnvironment: T_ActiveEnvironment | null;
    setEnabledEnvironmentDetails: (
		environment_id: T_ActiveEnvironment | null,
	) => void;
	getEnabledEnvironmentDetails: () => T_ActiveEnvironment | null;

    // TODO: rename this to something better emabled is the environment to pull variables from
    // active is for the tabs sidebar and active page edit
	activeEnvironmentDetails: T_ActiveEnvironment | null;
	setActiveEnvironmentDetails: (
		environment_id: T_ActiveEnvironment | null,
	) => void;
	getActiveEnvironmentDetails: () => T_ActiveEnvironment | null;

	activeEnvironment: T_Environment | null;
	setActiveEnvironment: (environment_id: T_Environment) => void;
	getActiveEnvironment: () => T_Environment | null;
	setActiveEnvironmentInEnvironments: (environment_id: T_Environment) => void;
	getActiveEnvironmentInEnvironments: () => T_Environment | null;
	addVariableToActiveEnvironment: () => void;
	updateVariableFieldInActiveEnvironment: (
		variable_id: string,
		field: string,
		value: string | boolean,
	) => void;
    saveActiveEnvironmentAndUpdateEnvironmentsList: () => void;

	// HELPERS

	// TODO: separate out different environments data object will certainly grow too large
	// TODO: use immer for state update slices
	environments: T_Environment[];
	setEnvironments: (collection: T_Environment[]) => void;
	getEnvironments: () => T_Environment[];
	addEmptyDefaultEnvironment: () => void;

    getEnvironmentById: (id: string) => T_Environment | null;

	globals: T_ManagedVariable[];
	setGlobals: (collection: T_ManagedVariable[]) => void;
	getGlobals: () => T_ManagedVariable[];

	vault: T_ManagedVariable[];
	setVault: (vault_items: T_ManagedVariable[]) => void;
	getVault: () => T_ManagedVariable[];

	vaultSecret: string | null;
	setVaultSecret: (secret: string | null) => void;
	getVaultSecret: () => string | null;
}

export const createEnvironmentsSlice: StateCreator<
	EnvironmentsSlice,
	[],
	[],
	EnvironmentsSlice
> = (set, get) => ({
	activeEnvironmentSliceItem: null,
	setActiveEnvironmentSliceItem: (item: T_ActiveEnvironmentSliceItem) =>
		set({ activeEnvironmentSliceItem: item }),
	getActiveEnvironmentSliceItem: () => get().activeEnvironmentSliceItem,

    enabledEnvironment: null,
    setEnabledEnvironmentDetails: (
		environment_details: T_ActiveEnvironment | null,
	) => {
        set({ enabledEnvironment: environment_details });
    },
	getEnabledEnvironmentDetails: () => get().enabledEnvironment,

	activeEnvironmentDetails: null,
	setActiveEnvironmentDetails: (environment_id: T_ActiveEnvironment | null) =>
		set({ activeEnvironmentDetails: environment_id }),
	getActiveEnvironmentDetails: () => get().activeEnvironmentDetails,

	activeEnvironment: null,
	setActiveEnvironment: (environment: T_Environment) => {
		set({
			activeEnvironment: environment,
		});
	},
	getActiveEnvironment: () => get().activeEnvironment,

	setActiveEnvironmentInEnvironments: (environment: T_Environment) => {
		const envs = structuredClone(get().environments);

		const env_index = envs.findIndex((env) => env.id === environment.id);
		if (env_index) {
			envs[env_index] = structuredClone(environment);

			set({
				environments: envs,
			});
		}
	},
	getActiveEnvironmentInEnvironments: () => {
		return (
			get().environments.find(
				(env) => env.id === get().activeEnvironmentDetails?.env_id,
			) || null
		);
	},
	addVariableToActiveEnvironment: () => {
		const aenv = get().activeEnvironment;

		if (aenv) {
			const managed_var_empty: T_ManagedVariable = {
				id: uuidv4(),
				key: "",
				description: "",
				enabled: true,
				secret: false,
				initial_value: "",
				current_value: "",
			};

			aenv.variables.push(managed_var_empty);

			set({
				activeEnvironment: structuredClone(aenv),
			});
		}
	},
	updateVariableFieldInActiveEnvironment: (
		variable_id: string,
		field: string,
		value: string | boolean,
	) => {
		const aenv = get().activeEnvironment;

		if (aenv) {
			const var_index = aenv.variables.findIndex((v) => v.id === variable_id);
			if (var_index !== -1) {
				aenv.variables[var_index][field] = value;

				set({
					activeEnvironment: structuredClone(aenv),
				});
			}
		}
	},
    saveActiveEnvironmentAndUpdateEnvironmentsList: () => {
        const aenv = get().activeEnvironment;

        if (aenv) {
            const envs = structuredClone(get().environments);

            const env_index = envs.findIndex((env) => env.id === aenv.id);

            if (env_index !== -1) {
                envs[env_index] = structuredClone(aenv);

                set({
                    environments: envs,
                });
            }
        }
    },

	environments: environment_test_data, // [],
	setEnvironments: (environments) => set({ environments }),
	getEnvironments: () => get().environments,
	addEmptyDefaultEnvironment: () => {
		const envs = structuredClone(get().environments);

		const new_env: T_Environment = {
			id: uuidv4(),
			name: "New Environment",
			variables: [],
			stages: [],
		};

		envs.push(new_env);

		set({
			environments: envs,
		});
	},

    getEnvironmentById: (id: string) => {
        return get().environments.find((env) => env.id === id) || null;
    },

	globals: globals_test_data, // [],
	setGlobals: (globals) => set({ globals }),
	getGlobals: () => get().globals,

	// TODO: vault and secret mangement - stronghold or other secure storage requied for secret - prereq
	vault: [],
	setVault: (vault_items) => set({ vault: vault_items }),
	getVault: () => get().vault,

	vaultSecret: null,
	setVaultSecret: (secret) => set({ vaultSecret: secret }),
	getVaultSecret: () => get().vaultSecret,
});

const env_id = uuidv4();
const v1 = uuidv4();
const v2 = uuidv4();
const v3 = uuidv4();

const globals_test_data: T_ManagedVariable[] = [
	{
		id: v1,
		key: "access_token",
		description: "jwt access token",
		enabled: true,
		secret: false,
		initial_value: "default value",
		current_value: "",
	},

	{
		id: v2,
		key: "refresh_token",
		description: "jwt refresh token",
		// TODO: if a disabled variable is used in a request, show user a prompt warning with the specific variable.
		enabled: false,
		secret: false,
		// TODO: UI - if a stage active, dim none active stage and default values
		initial_value: "default value",
		current_value: "",
	},

	{
		id: v3,
		key: "secret_var",
		description: "hidden secret for UI testing",
		enabled: true,
		secret: true,
		initial_value: "default value",
		current_value: "",
	},
];

const environment_test_data: T_Environment[] = [
	{
		id: env_id,
		name: "1 - New Environment",

		variables: [
			{
				id: v1,
				key: "access_token",
				description: "jwt access token",
				enabled: true,
				secret: false,
				initial_value: "default value",
				current_value: "",
			},

			{
				id: v2,
				key: "refresh_token",
				description: "jwt refresh token",
				// TODO: if a disabled variable is used in a request, show user a prompt warning with the specific variable.
				enabled: false,
				secret: false,
				// TODO: UI - if a stage active, dim none active stage and default values
				initial_value: "default value",
				current_value: "",
			},

			{
				id: v3,
				key: "secret_var",
				description: "hidden secret for UI testing",
				enabled: true,
				secret: true,
				initial_value: "default value",
				current_value: "",
			},
		],

		stages: [
			{
				id: uuidv4(),
				env_id: env_id,
				name: "dev",
				description: "development stage",

				variables: [
					{
						id: v1,
						value: "access",
					},

					{
						id: v2,
						value: "refresh",
					},

					{
						id: v3,
						value: "secret value",
					},
				],
			},

			{
				id: uuidv4(),
				env_id: env_id,
				name: "prod",
				description: "live / production",

				variables: [
					{
						id: v1,
						value: "prod-access",
					},

					{
						id: v2,
						value: "prod-refresh",
					},

					{
						id: v3,
						value: "prod secret value",
					},
				],
			},
		],
	},
];
