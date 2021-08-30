import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { AxiosResponse, AxiosError } from 'axios';
import * as Yup from 'yup';
import { Formik, Form, FormikHelpers, FormikErrors } from 'formik';
import TextField from 'elements/Form/TextField';
import UserInfoAccordian from 'components/UserInfoAccordian';
import { updateUserPasswordAction } from 'pages/Auth/ducks/actions';
import { ProfileContainer } from 'elements/Profile';
import FilledButton from 'elements/Button/FilledButton';
import ProfileImagesSection from 'components/ProfileImagesSection';
import { Props, FormValues } from 'pages/Auth/types';
import { Status } from 'pages/Dashboard/types';
import { RootState } from 'store';

const initialValues: FormValues = {
    current_password: '',
    new_password: '',
    confirm_new_password: '',
};
const validationSchema = Yup.object({
    current_password: Yup.string().max(30).required('Required'),
    new_password: Yup.string().max(30).min(8).required('Required'),
    confirm_new_password: Yup.string()
        .max(30)
        .min(8)
        .required('Required')
        .when('new_password', {
            is: (val: string) => !!(val && val.length > 0),
            then: Yup.string().oneOf(
                [Yup.ref('new_password')],
                'Password & Confirm Password Must be same'
            ),
        }),
});

const ChangePassword: React.FC<Props> = ({ updateUserPassword, user }) => {
    const [form_status, setFormStatus] = useState<Status>({
        type: '',
        message: '',
    });
    const handleSubmit = (
        values: FormValues,
        helpers: FormikHelpers<FormValues>
    ) => {
        const { setErrors, setSubmitting, resetForm } = helpers;
        const { current_password, new_password, confirm_new_password } = values;
        updateUserPassword(current_password, new_password, confirm_new_password)
            .then((resp: AxiosResponse) => {
                if (resp) {
                    setFormStatus({
                        message: 'Password Successfully Changed!',
                        type: 'success',
                    });
                    setSubmitting(false);
                    resetForm();
                }
            })
            .catch((error: AxiosError) => {
                const fieldError: FormikErrors<FormValues> = {};
                if (error && error.message) {
                    setFormStatus({ message: error.message, type: 'danger' });
                }
                if (error.response && error.response.data.current_password) {
                    fieldError.current_password =
                        error.response.data.current_password;
                }
                if (error.response && error.response.data.new_password) {
                    fieldError.new_password = error.response.data.new_password;
                }
                if (
                    error.response &&
                    error.response.data.confirm_new_password
                ) {
                    fieldError.confirm_new_password =
                        error.response.data.confirm_new_password;
                }
                setSubmitting(false);
                setErrors(fieldError);
            });
    };
    return (
        <>
            <ProfileImagesSection user={user} allowEdit />

            <ProfileContainer>
                <Row>
                    <Col md='4'>
                        <UserInfoAccordian userInfo={user.profile} />
                    </Col>
                    <Col md='8'>
                        <Card>
                            <Card.Header>
                                <h6 className='mb-0'>Update Password</h6>
                            </Card.Header>
                            <Card.Body>
                                {form_status.type !== '' ? (
                                    <Alert variant={form_status.type}>
                                        {form_status.message}
                                    </Alert>
                                ) : (
                                    ''
                                )}
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={handleSubmit}
                                    validationSchema={validationSchema}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <TextField
                                                type='password'
                                                name='current_password'
                                                placeholder='Enter Current Password'
                                                className='mb-2'
                                                errorClassName='text-danger'
                                                label='Current Password'
                                            />
                                            <TextField
                                                type='password'
                                                name='new_password'
                                                placeholder='Enter New Password'
                                                className='mb-2'
                                                errorClassName='text-danger'
                                                label='New Password'
                                                bottomText={
                                                    <ul>
                                                        <li>
                                                            Your password can’t
                                                            be too similar to
                                                            your other personal
                                                            information.
                                                        </li>
                                                        <li>
                                                            Your password must
                                                            contain at least 8
                                                            characters.
                                                        </li>
                                                        <li>
                                                            Your password can’t
                                                            be a commonly used
                                                            password.
                                                        </li>
                                                        <li>
                                                            Your password can’t
                                                            be entirely numeric.
                                                        </li>
                                                    </ul>
                                                }
                                            />
                                            <TextField
                                                type='password'
                                                name='confirm_new_password'
                                                placeholder='Confirm New Password'
                                                className='mb-2'
                                                errorClassName='text-danger'
                                                label='Confirm New Password'
                                            />
                                            <FilledButton
                                                variant='primary'
                                                type='submit'
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
                                                    'Update Password'
                                                )}
                                            </FilledButton>
                                        </Form>
                                    )}
                                </Formik>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </ProfileContainer>
        </>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateUserPassword: (
            current_password: string,
            new_password: string,
            confirm_new_password: string
        ) =>
            dispatch(
                updateUserPasswordAction(
                    current_password,
                    new_password,
                    confirm_new_password
                )
            ),
    };
};
const mapStateToProps = (state: RootState) => {
    return {
        user: state.auth.user,
    };
};

export const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ChangePassword);
