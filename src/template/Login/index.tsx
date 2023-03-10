import React, {useState} from 'react'
import cx from 'classnames'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldPassword, Icon, Modal, Success } from "components";

import styles from './Login.module.scss'

type FormValues = {
  email: string,
  password: string,
}

const Login = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true)
  const LoginSchema = yup.object().shape({
    email: yup.string().email('Email is not correct').required('Email is required'),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = (values: FormValues) => {
    console.log(values)
    setIsOpenModal(true)
    reset()
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      <Modal
        className={styles.modal}
        closeClassName={styles.close}
        visible={isOpenModal}
        onClose={handleCloseModal}
      >
      <Success onClose={handleCloseModal} />
      </Modal>

    <div className={styles.wrapper}>
      <div className={cx(styles.col, styles.banner)}>
        <div className={styles.logo}><Icon.Logo /><span>Auth form</span></div>
        <p className={styles.info}>Sign in to continue or create account</p>
      </div>
      <div className={styles.col}>
        <h3 className={styles.title}>Sign in</h3>
        <form className={styles.form} autoComplete='off'>
          <Controller
            control={control}
            name='email'
            render={({ field }) => (
              <Field
                {...field}
                className={styles.loginField}
                placeholder='john@gmail.com'
                label='E-mail'
                inputMode='email'
                error={errors.email?.message}
                icon={<Icon.Email />}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <FieldPassword
                {...field}
                className={styles.loginField}
                label='Password'
                inputMode='text'
                error={errors.password?.message}
              />
            )}
          />
          <button
            className={cx('btn', styles.button)}
            onClick={handleSubmit(onSubmit)}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
        </>
  )
}

export default Login
