import { useForm } from 'react-hook-form';
import { useRef} from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './App.module.css';

const fieldsScheme = yup.object()
.shape({email:yup.string()
	.matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Должен быть символ "@", разрешено использование латиницы, цифр, точки, дефиса и нижнего подчеркивания')
	 .required('Email обязателен'),

	password1: yup.string()
	.required('Пароль обязателен')
	.matches( /(?=.*[a-z])(?=.*[A-Z])/, 'Пароль должен содержать хотя бы одну заглавную и одну строчную букву, используются только латинские буквы')
	.min(6, 'Пароль должен содержать минимум 6 символов'),

	password2 : yup.string()
	.required('Подтвердите пароль')
	.oneOf([yup.ref('password1')], 'Пароли не совпадают')
});

function App () {

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch
	} = useForm ({
		defaultValues: {email: '',
			password1: '',
			password2: '',
		},
		resolver: yupResolver(fieldsScheme),
		mode: 'onChange'
	});

	const emailError = errors.email?.message;
	const password1Error = errors.password1?.message;
	const password2Error = errors.password2?.message;

	const submitButtonRef = useRef(null);

	const values = watch();
	
	const checkAndFocus = () => {
    const hasErrors = Object.keys(errors).length === 0;
    const allFieldsFilled = values.email && values.password1 && values.password2;
    
      if (hasErrors && allFieldsFilled && submitButtonRef.current) {
      setTimeout(() => {
        submitButtonRef.current.focus();
      }, 10);
    }
  };
    
  const handleInputChange = () => {
    checkAndFocus(); 
};
	

  const onSubmit = (formData) => {
		console.log(formData);
		reset();
	};

return(<div className = {styles.app}>
	<h1 className = {styles.title}>Регистрация</h1>
	<form className = {styles.registrationForm} onSubmit = {handleSubmit(onSubmit)} onChange = {handleInputChange}>
		<label className = {styles.formLabel}>Email</label>
		<input 
		className={errors.email ? styles.error : ''}
		type = "email"
		name = "email"
		placeholder = "Почта"
		{... register('email')}
		/>
		{errors.email && (<div className = {styles.errorMessage}>{errors.email?.message}</div>)}
		<label className = {styles.formLabel}>Пароль</label>
		<input 
		className={errors.password1 ? styles.error : ''}
		type = "password"
		name = "password1"
		placeholder = "Пароль"
		{... register('password1')}
		/>
		{errors.password1 && (<div className = {styles.errorMessage}>{errors.password1?.message}</div>)}

		<label className = {styles.formLabel}>Повторите пароль</label>
		<input 
		className={errors.password2 ? styles.error : ''}
		type = "password"
		name = "password2"
		placeholder = "Повторный пароль"
		{... register('password2')}
		/>
		{errors.password2 && (<div className = {styles.errorMessage}>{errors.password2?.message}</div>)}
		<button className={`${styles.sbmBtn} ${!!emailError || !!password1Error || !!password2Error ? styles.disabled : ''}`} ref = {submitButtonRef} type = "submit" disabled = {!!emailError || !!password1Error || !!password2Error}>Зарегистрироваться</button>
	</form>
  </div>
 );
};
export default App;
