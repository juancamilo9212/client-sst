import React,{useState} from 'react';
import './SignUpForm.scss';
import {Form, Input, Button, notification} from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import {minLengthValidation, emailValidation} from '../../../utils/formValidation';
import {addUserApi} from '../../../api/user';

export default function SignUpForm() {
    
    const [userData, setUserData] = useState({
      name:"",
      lastName:"",
      email:"",
      password:"",
      repeatPassword:""
    });

    const [formValidation, setFormValidation] = useState({
        email:false,
        password:false,
        repeatPassword:false
    })

    const createUser = async() => {
        if(!userData.name || !userData.lastName
        || !userData.email || !userData.password
        || !userData.repeatPassword){
            notification["warning"]({
                message:"Todos los campos son requeridos"
            })
        }else{
            if(!formValidation.email || !formValidation.password
                || !formValidation.repeatPassword
                ){
                    notification["error"]({
                        message:"Hay datos inválidos"
                    }) 
            }else{
                if(userData.password !== userData.repeatPassword){
                    notification["error"]({
                        message: "Las contraseñas deben ser iguales"
                    })
                }else{
                    await addUserApi(userData).then(response => {
                        notification["success"]({
                            message: response.message
                        })
                    }).catch(err => {
                        notification["error"]({
                            message:err
                        })
                    })
                    resetForm(); 
                }
            } 
        }
        }

        const resetForm = () => {

        const input = document.getElementsByTagName('input');
        for(let i=0;i<input.length;i++){
        input[i].classList.remove("success");
        input[i].classList.remove("error");
        }
            setUserData({
            name:"",
            lastName:"",
            email:"",
            password:"",
            repeatPassword:""
            });

            setFormValidation({
            email:false,
            password:false,
            repeatPassword:false
            })

        }

        const inputValidation = (e) => {
            const {type, name} = e.target;
            if(type === "email"){
                setFormValidation({
                    ...formValidation,
                    [name]:emailValidation(e.target)
                })
            }

            if(type === "password"){
                setFormValidation({
                    ...formValidation,
                    [name]:minLengthValidation(6, e.target)
                })
            }
        }

        const changeForm = (e) => {
            const {name} = e.target;
            setUserData({...userData, [name]: e.target.value})
        }
        

    return (
        <Form 
        className="sign-up-form" 
        onSubmitCapture={createUser} 
        onChange={changeForm}
        >
            
            <Input
            placeholder="Nombre(s)"
            prefix={<UserOutlined />}
            name="name"
            className="sign-up-form__input"
            value={userData.name}
            />
           
            <Input
            placeholder="Apellido(s)"
            prefix={<UserOutlined />}
            name="lastName"
            className="sign-up-form__input"
            value={userData.lastName}
            />
           
            <Input
            placeholder="Correo electrónico"
            prefix={<MailOutlined />}
            name="email"
            type="email"
            className="sign-up-form__input"
            value={userData.email}
            onChange={inputValidation}/>

            <Input
            placeholder="Contraseña"
            prefix={<LockOutlined />}
            name="password"
            type="password"
            className="sign-up-form__input"
            value={userData.password}
            onChange={inputValidation}/>

            <Input
            placeholder="Repetir Contraseña"
            prefix={<LockOutlined />}
            name="repeatPassword"
            type="password"
            className="sign-up-form__input"
            value={userData.repeatPassword}
            onChange={inputValidation}/>

            <Button
            htmlType="submit"
            className="sign-up-form__submit"
            >
            Crear cuenta
            </Button>

        </Form>
    )
}
