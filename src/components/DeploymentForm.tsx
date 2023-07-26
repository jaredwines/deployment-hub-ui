import React, { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@mui/material";
import {formConfig} from "./formConfig";
import {projectOptions} from "./projectOptions";
import Select from "./Select";
import {branchOptions} from "./branchOptions";
import './DeploymentForm.scss';

type DeploymentFormProps = {
    //
}

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
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!data.project || !data.action) {
            return
        }
        let url = 'http://192.168.0.216:5000/'+data.project+'/'+data.action;

        if (data.branch) {
            url += '/'+data.branch;
        }

        fetch(url, {
            method: "GET",
            mode:'no-cors'
        })
    }

    const projectSelection = watch("project");
    const actionSelection = watch("action");

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
    </div>;
}

export default DeploymentForm;
