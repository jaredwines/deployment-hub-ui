import React, {useCallback, useEffect, useState} from 'react';
import {FormProvider, SubmitHandler, useForm} from "react-hook-form"
import {useMutation,} from '@tanstack/react-query'
import {Alert, AlertTitle, Button} from "@mui/material";
import {formConfig} from "./config/formConfig";
import {projectOptions} from "./config/projectOptions";
import Select from "../select/Select";
import {branchOptions} from "./config/branchOptions";
import './DeploymentForm.scss';
import classNames from "classnames";
import {submitCommand} from "./submitCommand";
import {useTimeout} from "./useTimeout";
import { useAppDispatch } from '../../reduxHooks'
import {
    selectWasFailure,
    selectWasSuccessful,
    updateWasFailure,
    updateWasSuccessful,
} from '../../slices/resultsSlice'
import {useAppSelector} from "../../reduxHooks";

type DeploymentFormProps = {
}

const alertTimeout = 5; // 5 seconds

const DeploymentForm: React.FC<DeploymentFormProps> = () => {
    const dispatch = useAppDispatch()
    const methods = useForm<Inputs>({
        defaultValues: {
            project: 'home-assistant',
            action: 'deploy',
            branch: 'none',
        },
    })

    const {
        handleSubmit,
        watch,
    } = methods;

    const {
        isLoading,
        mutate,
    } = useMutation({
        mutationFn: submitCommand,
        onSuccess: () => setWasSuccessful(true),
        onError: () => setWasFailure(true),
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => mutate(data)

    const projectSelection = watch("project");
    const actionSelection = watch("action");

    const setWasSuccessful = (update: boolean) => dispatch(updateWasSuccessful(update))
    const setWasFailure = (update: boolean) => dispatch(updateWasFailure(update))

    const wasSuccessful = useAppSelector(selectWasSuccessful)
    const wasFailure = useAppSelector(selectWasFailure)

    // re-hides success alert
    const { secondsLeft: successfulSecondsLeft } = useTimeout({
        callback: () => setWasSuccessful(false),
        dependencyArray: [wasSuccessful],
        timeoutSeconds: alertTimeout,
    })

    // re-hides failure alert
    const { secondsLeft: failureSecondsLeft } = useTimeout({
        callback: () => setWasFailure(false),
        dependencyArray: [wasFailure],
        timeoutSeconds: alertTimeout,
    })

    const getActionOptions = useCallback(() => {
        const actionsAndArgs = formConfig.projects[projectSelection]
        const actions = Object.keys(actionsAndArgs);
        return actions.map((action) => ({
            label: action,
            value: action
        }))
    }, [projectSelection]);
    const [actionOptions, setActionOptions] = useState<Option[]>(getActionOptions());

    useEffect(() => {
        setActionOptions(() => getActionOptions());
    }, [getActionOptions, projectSelection])

    return <>
        {wasSuccessful && <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Update is <strong>complete</strong>. ({successfulSecondsLeft})
        </Alert>}
        {wasFailure && <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Something went wrong. ({failureSecondsLeft})
        </Alert>}
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={'deployment-form'}>
                {isLoading && 'Loading...'}

                <Select
                    label={'Project'}
                    name={'project'}
                    options={projectOptions}
                    controllerProps={{
                        rules: {required: true}
                    }}
                />

                <Select
                    label={'Action'}
                    name={'action'}
                    options={actionOptions}
                    controllerProps={{
                        rules: {required: true}
                    }}
                />

                <Select
                    label={'Branch'}
                    name={'branch'}
                    options={branchOptions}
                    className={classNames({
                        'hide': !actionSelection
                    })}
                />

                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </FormProvider>
    </>;
}

export default DeploymentForm;
