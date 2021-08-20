/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Card, Row, Col, Form as FormBS, Spinner } from 'react-bootstrap';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { SelectField } from 'elements/Form';
import { FilledButton } from 'elements/Button';
import { history } from 'App';
import { Props, FormValues } from 'components/SearchFilters/types';

const SearchFilters: React.FC<Props> = (props: Props) => {
    const { workFilters, educationFilters, hometownFilters } = props;
    const RELATIONSHIP_STATUES = ['Single', 'Committed', 'Married', 'Divorced'];
    const initialValues: FormValues = {
        hometown: '',
        work: '',
        education: '',
        gender: '',
        relationship_status: '',
    };
    const validationSchema = Yup.object({
        hometown: Yup.string().oneOf(hometownFilters),
        work: Yup.string().oneOf(workFilters),
        education: Yup.string().oneOf(educationFilters),
        gender: Yup.string().oneOf(['Male', 'Female', 'Others']),
        relationship_status: Yup.string().oneOf(RELATIONSHIP_STATUES),
    });
    const searchFormResetHandler = () => {
        history.push(
            `/search/?search=${new URLSearchParams(history.location.search).get(
                'search'
            )}`
        );
    };
    const searchFormSubmitHandler = (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        const { hometown, work, education, gender, relationship_status } =
            values;
        const updatedQueryParams = new URLSearchParams({
            search: new URLSearchParams(history.location.search).get(
                'search'
            ) as string,
        });
        if (hometown) updatedQueryParams.append('hometown', hometown);
        if (work) updatedQueryParams.append('work', work);
        if (education) updatedQueryParams.append('education', education);
        if (gender) updatedQueryParams.append('gender', gender);
        if (relationship_status)
            updatedQueryParams.append(
                'relationship_status',
                relationship_status
            );
        setSubmitting(false);
        history.push(`/search/?${updatedQueryParams.toString()}`);
    };

    return (
        <Card>
            <Card.Header>Search Filters</Card.Header>
            <Card.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={searchFormSubmitHandler}
                    onReset={searchFormResetHandler}
                >
                    {({ values, errors, touched, isSubmitting }) => (
                        <Form>
                            <SelectField
                                className='mb-3'
                                label='Hometown'
                                name='hometown'
                                value={
                                    values.hometown === ''
                                        ? 'Select Hometown'
                                        : values.hometown
                                }
                            >
                                <option disabled>Select Hometown</option>
                                {hometownFilters.map((city) => (
                                    <option value={city} key={city}>
                                        {city}
                                    </option>
                                ))}
                            </SelectField>
                            <SelectField
                                className='mb-3'
                                label='Education'
                                name='education'
                                value={
                                    values.education === ''
                                        ? 'Select Education'
                                        : values.education
                                }
                            >
                                <option disabled>Select Education</option>
                                {educationFilters.map((education) => (
                                    <option value={education} key={education}>
                                        {education}
                                    </option>
                                ))}
                            </SelectField>
                            <SelectField
                                className='mb-3'
                                label='Work'
                                name='work'
                                value={
                                    values.work === ''
                                        ? 'Select Work'
                                        : values.work
                                }
                            >
                                <option disabled>Select Work</option>
                                {workFilters.map((work) => (
                                    <option value={work} key={work}>
                                        {work}
                                    </option>
                                ))}
                            </SelectField>
                            <FormBS.Label className='mb-0'>
                                Gender{' '}
                            </FormBS.Label>
                            <FormBS.Group className='mb-2'>
                                <div className='form-check form-check-inline'>
                                    <label className='form-check-label'>
                                        <Field
                                            type='radio'
                                            name='gender'
                                            value='Male'
                                            className='mr-1 form-check-input'
                                            checked={values.gender === 'Male'}
                                        />
                                        Male
                                    </label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <label className='form-check-label'>
                                        <Field
                                            type='radio'
                                            name='gender'
                                            value='Female'
                                            className='mr-1 form-check-input'
                                            checked={values.gender === 'Female'}
                                        />
                                        Female
                                    </label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <label className='form-check-label'>
                                        <Field
                                            type='radio'
                                            name='gender'
                                            value='Others'
                                            className='mr-1 form-check-input'
                                            checked={values.gender === 'Others'}
                                        />
                                        Others
                                    </label>
                                </div>

                                {touched.gender && errors.gender ? (
                                    <FormBS.Text className='text-danger'>
                                        {errors.gender}
                                    </FormBS.Text>
                                ) : null}
                            </FormBS.Group>
                            <SelectField
                                label='Relationship Status'
                                name='relationship_status'
                                value={
                                    values.relationship_status === ''
                                        ? 'Select Relationship Status'
                                        : values.relationship_status
                                }
                                className='mb-3'
                            >
                                <option disabled>
                                    Select Relationship Status
                                </option>
                                {RELATIONSHIP_STATUES.map(
                                    (relationship_status) => (
                                        <option
                                            value={relationship_status}
                                            key={relationship_status}
                                        >
                                            {relationship_status}
                                        </option>
                                    )
                                )}
                            </SelectField>
                            <Row className='justify-content-center'>
                                <Col className='col-auto'>
                                    <FilledButton
                                        type='Submit'
                                        variant='primary'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <Spinner
                                                as='span'
                                                animation='border'
                                                size='sm'
                                                role='status'
                                                aria-hidden='true'
                                            />
                                        ) : (
                                            'Apply Filters'
                                        )}
                                    </FilledButton>
                                </Col>
                                <Col className='col-auto'>
                                    <FilledButton
                                        type='Reset'
                                        variant='danger'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <Spinner
                                                as='span'
                                                animation='border'
                                                size='sm'
                                                role='status'
                                                aria-hidden='true'
                                            />
                                        ) : (
                                            'Reset Filters'
                                        )}
                                    </FilledButton>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
};

export default SearchFilters;
