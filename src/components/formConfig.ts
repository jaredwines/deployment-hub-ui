type FormConfig = {
    projects: Record<Project, ActionsAndArgs>
}

type ActionsAndArgs = Record<string, string[]>

const defaultActionArgs = ['branch']
export const formConfig: FormConfig = {
    projects: {
        'alohamillworks': {
            'deploy': defaultActionArgs
        },
        'coastalteardrops': {
            'deploy': defaultActionArgs
        },
        'jaredwines': {
            'deploy': defaultActionArgs
        },
        'home-assistant': {
            'deploy': defaultActionArgs,
            'start': defaultActionArgs,
            'stop': defaultActionArgs,
            'restart': defaultActionArgs,
            'update': defaultActionArgs,
            'backup': defaultActionArgs,
        },
        'homebridge': {
            'deploy': defaultActionArgs,
            'start': defaultActionArgs,
            'stop': defaultActionArgs,
            'restart': defaultActionArgs,
            'update': defaultActionArgs,
            'backup': defaultActionArgs,
        },
        'deployment-hub': {
            'deploy': defaultActionArgs
        },
        'deployment-hub-ui': {
            'deploy': defaultActionArgs,
            'start': defaultActionArgs,
            'stop': defaultActionArgs,
            'restart': defaultActionArgs,
            'update': defaultActionArgs,
            'backup': defaultActionArgs,
        }
    }
}