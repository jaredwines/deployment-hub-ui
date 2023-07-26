import React, { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import {
    useMutation,
} from '@tanstack/react-query'
import {Alert, AlertTitle, Button} from "@mui/material";
import {formConfig} from "./formConfig";
import {projectOptions} from "./projectOptions";
import Select from "./Select";
import {branchOptions} from "./branchOptions";
import './DeploymentForm.scss';

type DeploymentFormProps = {
    //
}

const alertTimeout = 5000; // 5 seconds

const DeploymentForm: React.FC<DeploymentFormProps> = ({}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            project: 'home-assistant',
            action: 'deploy'
        },
    })
    const submitCommand = async (data: Inputs) => {
        if (!data.project || !data.action) {
            return
        }
        let url = 'http://192.168.0.216:5000/'+data.project+'/'+data.action;

        if (data.branch) {
            url += '/'+data.branch;
        }

        return fetch(url, {
            method: "GET",
            mode:'no-cors'
        })
    }
    const {
        isLoading,
        mutate,
    } = useMutation({
        mutationFn: submitCommand,
        onSuccess: () => setWasSuccessful(true),
        onError: () => setWasFailure(true),
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        mutate(data)
    }

    const projectSelection = watch("project");
    const actionSelection = watch("action");

    const [wasSuccessful, setWasSuccessful] = useState(false);
    const [wasFailure, setWasFailure] = useState(false);

    useEffect(() => {
        // re-hides success alert
        const timeout = setTimeout(() => setWasSuccessful(false), alertTimeout)
        return clearTimeout(timeout);
    }, [wasSuccessful]);

    useEffect(() => {
        // re-hides failure alert
        const timeout = setTimeout(() => setWasFailure(false), alertTimeout)
        return clearTimeout(timeout);
    }, [wasFailure]);

    const getActionOptions = useCallback(() => {
        const actionsAndArgs = formConfig.projects[projectSelection]
        const actions = Object.keys(actionsAndArgs);
        return actions.map((action)=>({
            label: action,
            value: action
        }))
    }, [projectSelection]);
    const [actionOptions, setActionOptions] = useState<Option[]>(getActionOptions());

    useEffect(() => {
        setActionOptions(getActionOptions());
    }, [projectSelection]);

    return <div className={'page'}>
        <form onSubmit={handleSubmit(onSubmit)} className={'deployment-form'}>
            {isLoading && 'Loading...'}
            <Select
                label={'Project'}
                options={projectOptions}
                {...register("project", { required: true })}
                fieldError={errors.project}
            />

            <Select
                label={'Action'}
                options={actionOptions}
                {...register("action", { required: true })}
                fieldError={errors.action}
            />

            {
                actionSelection && <>
                    <Select
                        label={'Branch'}
                        options={branchOptions}
                        {...register('branch')}
                    />
                </>
            }

            <Button variant="contained" type="submit">Submit</Button>
        </form>

        {wasSuccessful && <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Update is <strong>complete</strong>.
        </Alert>}
        {wasFailure && <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Something went wrong.
        </Alert>}
    </div>;
}

export default DeploymentForm;
