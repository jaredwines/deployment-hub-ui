import React, {ReactNode, useEffect, useState} from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import {formConfig} from "./formConfig";

const projectOptions: ProjectOption[] = [
    {
        label: 'Aloha Mill Works',
        value: 'alohamillworks'
    },
    {
        label: 'Coastal Teardrops',
        value: 'coastalteardrops'
    },
    {
        label: 'Jared Wines Personal Website',
        value: 'jaredwines'
    },
    {
        label: 'Home Assistant',
        value: 'home-assistant'
    },
    {
        label: 'Homebridge',
        value: 'homebridge'
    },
    {
        label: 'Deployment Hub',
        value: 'deployment-hub'
    },
    {
        label: 'Deployment Hub UI',
        value: 'deployment-hub-ui'
    }
]

const branchOptions = [{
    label: 'main',
    value: 'main',
}, {
    label: 'master',
    value: 'master',
}]

type DeploymentFormProps = {
    //
}

type Inputs = {
    project: Project
    action: string
    branch?: string
}

const DeploymentForm: React.FC<DeploymentFormProps> = ({}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            project: 'home-assistant'
        },
    })
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        fetch('http://192.168.0.216:5000/'+data.project+'/'+data.action+'/'+data.branch, {
            method: "GET",
            mode:'no-cors'
        })
    }

    const [actionOptions, setActionOptions] = useState<Option[]>([{
        label: 'deploy',
        value: 'deploy'
    }]);

    const projectSelection = watch("project");
    const actionSelection = watch("action");

    useEffect(() => {
        const actionsAndArgs = formConfig.projects[projectSelection]
        const updatedActionOptions = Object.keys(actionsAndArgs).map((action)=>({
            label: action,
            value: action
        }))

        setActionOptions(updatedActionOptions);
    }, [projectSelection]);

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* include validation with required or other standard HTML validation rules */}
            <InputLabel id="project-label">Project</InputLabel>
            <Select
                labelId="project-label"
                id="project-select"
                label="Project"
                {...register("project", { required: true })}
            >
                {projectOptions.map((option) => {
                    return <MenuItem value={option.value}>{option.label}</MenuItem>
                })}
            </Select>
            {/* errors will return when field validation fails  */}
            {errors.project && <span>This field is required</span>}

            {/* include validation with required or other standard HTML validation rules */}
            <InputLabel id="action-label">Action</InputLabel>
            <Select
                labelId="action-label"
                id="action-select"
                label="Project"
                {...register("action", { required: true })}
            >
                {actionOptions.map((option) => {
                    return <MenuItem value={option.value}>{option.label}</MenuItem>
                })}
            </Select>
            {/* errors will return when field validation fails  */}
            {errors.action && <span>This field is required</span>}

            {/* include validation with required or other standard HTML validation rules */}
            {
                actionSelection && <>
                    <InputLabel id="branch-label">Branch</InputLabel>
                    <Select
                        labelId="branch-label"
                        id="branch-select"
                        label="Project"
                        {...register("branch")}
                    >
                        {branchOptions.map((option) => {
                            return <MenuItem value={option.value}>{option.label}</MenuItem>
                        })}
                    </Select>
                </>
            }

            <Button variant="contained" type="submit">Submit</Button>
        </form>
    </>;
}

export default DeploymentForm;
