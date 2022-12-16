import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';

import {ApplicantValidator} from '../../validators';

import css from './ApplicantForm.module.css';
import {createApplicantThunk, updateApplicantThunk} from '../../store';
import {useEffect} from 'react';


const ApplicantForm = () => {
    const {applicantForUpdate} = useSelector(state => state.applicantReducer);

    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
        reset
    } = useForm({resolver: joiResolver(ApplicantValidator), mode: 'onTouched'});

    const dispatch = useDispatch();

    const submit = (data) => {
        console.log(data);
        const obj = {
            name: data.name,
            surname: data.surname,
            skills: data.skills.toString(),
            level: data.level
        }

        if (applicantForUpdate) {
            dispatch(updateApplicantThunk({id: applicantForUpdate.id, applicant: obj}));
        } else {
            dispatch(createApplicantThunk(obj));
        }
        reset();
    }

    useEffect(() => {
        console.log(applicantForUpdate);
        if (applicantForUpdate) {
            setValue('name', applicantForUpdate.name)
            setValue('surname', applicantForUpdate.surname)
            setValue('skills', applicantForUpdate.skills)
            setValue('level', applicantForUpdate.level)
        }
    }, [applicantForUpdate]);

    return (
        <form onSubmit={handleSubmit(submit)} className={css.form}>
            <div className={`${css.item} ${css.flex}`}>
                <label>Name: </label>
                <input type="text"
                       defaultValue={''} {...register('name')}/>
                <div>{errors.name?.message}</div>
            </div>

            <div className={`${css.item} ${css.flex}`}>
                <label>Surname: </label>
                <input type="text"
                       defaultValue={''} {...register('surname')}/>
                <div>{errors.surname?.message}</div>
            </div>

            <div className={`${css.item} ${css.flex}`}>
                <label>Skills: </label>
                <div>
                    <select multiple name="skills" defaultValue={[]} {...register('skills')}>
                        <option value="js">JS</option>
                        <option value="java">Java</option>
                        <option value="c#">C#</option>
                        <option value="c++">C++</option>
                        <option value="python">Python</option>
                    </select>
                </div>
            </div>

            <div className={`${css.item} ${css.flex}`}>
                <label>Level:</label>
                <select name="level" defaultValue={0} {...register('level')}>
                    <option value={0}>-- Select level --</option>
                    <option value={0}>Trainee</option>
                    <option value={1}>Junior</option>
                    <option value={2}>Middle</option>
                    <option value={3}>Senior</option>
                </select>
                <div>{errors.level?.message}</div>
            </div>

            <button>Save</button>
        </form>
    );
};

export {ApplicantForm};