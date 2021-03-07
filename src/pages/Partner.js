import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
import { useFormik } from 'formik';
import * as yup from 'yup'
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import axios from 'axios';
import { useAlert } from "react-alert";
const Container = tw(ContainerBase)`min-h-screen text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
// const LogoLink = tw.a``;
// const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-2 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;



// const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
// const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-lg`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Select = tw.select`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
// const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
// const IllustrationImage = styled.div`
//   ${props => `background-image: url("${props.imageSrc}");`}
//   ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
// `;
 
const { REACT_APP_API_URL } = process.env
export default ({
  logoLinkUrl = "#",
  illustrationImageSrc = illustration,
  headingText = "Become a partner with us.",
 
  submitButtonText = "Submit Application",
  SubmitButtonIcon = LoginIcon,

}) => {
  const [country, setCountry] = useState([])
  const [value] = useState('')
  const alertCus = useAlert();
    const getCountry = async () => {
      try {
        const {data} = await axios.get(REACT_APP_API_URL+ 'country')
        setCountry(data)
      } catch (error) {
        console.log(error)
      }
  
    }
  useEffect(()=> {
   getCountry()
  },[])

  const formik = useFormik({
    initialValues: {
      
        "name": "",
        "street_address": "",
        "city": "",
        "country": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "phone": "",
        "cusine": ""
    
    },
    onSubmit: async values => {
      // if
    alert(JSON.stringify(values))
      const countryData = country.find(c => c.alpha_two_code === values.country);
        try {
          await axios.post(REACT_APP_API_URL+ 'partner-application', 
          values,
          // {...values ,country: countryData && countryData.uuid , country_id: countryData && countryData.uuid},
            {
                headers: {
                    'Content-Type': `application/json`,
                    // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    // 'Access-Control-Allow-Origin' : '*'
                }
            }
            )
          
         
           
            alertCus.success("Partner application submitted successfully");
           
           
            
        } catch (error) {
            console.log(error)
            if ((error.message && error.message.toLowerCase() === 'network error') || (error && error.response && error.response.status === 500)) {
              alertCus.error("Network Error!");
          //  formik.setFieldError('email', 'Network Error!!!')
              // actions.setSubmitting(false);
          }
          

          if(error.response && error.response.data && error.response.data) {
              formik.setErrors(error.response.data)
              alertCus.error("Some fields not field correctly");
          }
        }
 


    //   localStorage.setItem('auth_token', )
    },
  });



  return (
  <AnimationRevealPage>
      <Header />
    <Container>
      <Content>
        <MainContainer>
         
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
         
              {/* <Form> */}
                <Input  onChange={formik.handleChange} value={formik.values.name} name='name' className='w-100' type="text" placeholder="Business Name" />
                 { formik.touched && formik.errors.name &&  <small style={{color:'red'}}>{formik.errors.name}</small> }
                <Input onChange={formik.handleChange} value={formik.values.first_name} name='first_name'  className='w-100' type="text" placeholder="First Name" />
                { formik.touched && formik.errors.first_name &&  <small style={{color:'red'}}>{formik.errors.first_name}</small> }
                <Input onChange={formik.handleChange} value={formik.values.last_name} name='last_name' className='w-100' type="text" placeholder="Last Name" />
                { formik.touched && formik.errors.last_name &&  <small style={{color:'red'}}>{formik.errors.last_name}</small> }
               

                <Input onChange={formik.handleChange} value={formik.values.cusine} name='cusine' className='w-100' type="text" placeholder="Cusine" />
                { formik.touched && formik.errors.cusine &&  <small style={{color:'red'}}>{formik.errors.cusine}</small> }
                {/* <Input onChange={formik.handleChange} value={formik.values.firstName} name='cusine' className='w-100' type="text" placeholder="Cusine" /> */}
                {/* <Input onChange={formik.handleChange} value={formik.values.country} name='country' className='w-100' type="text" placeholder="Country" /> */}
                <Select onChange={formik.handleChange} value={formik.values.country}  id="country" name="country" autocomplete="country" className="mt-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value={""}>Select Country</option>
                 { country.map((data) => <option value={data.uuid}>{data.name}</option>)} 
                
                </Select>
                { formik.touched && formik.errors.country &&  <small style={{color:'red'}}>{formik.errors.country}</small> }
                <Input onChange={formik.handleChange} value={formik.values.state} name='state' className='w-100' type="text" placeholder="State" />
                { formik.touched && formik.errors.country &&  <small style={{color:'red'}}>{formik.errors.country}</small> }
                <Input onChange={formik.handleChange} value={formik.values.street_address} name='street_address' className='w-100' type="text" placeholder="Street Adress" />
                { formik.touched && formik.errors.street_address &&  <small style={{color:'red'}}>{formik.errors.street_address}</small> }

                <Input onChange={formik.handleChange} value={formik.values.city} name='city' className='w-100' type="text" placeholder="Last Name" />
                { formik.touched && formik.errors.city &&  <small style={{color:'red'}}>{formik.errors.city}</small> }

                <Input onChange={formik.handleChange} value={formik.values.email} name='email' type="email" placeholder="Email" />
                { formik.touched && formik.errors.email &&  <small style={{color:'red'}}>{formik.errors.email}</small> }
                <Input onChange={formik.handleChange} value={formik.values.phone} name='phone' type="text" placeholder="Phone Number" />
                { formik.touched && formik.errors.phone &&  <small style={{color:'red'}}>{formik.errors.phone}</small> }
              
                <SubmitButton onClick={()=> formik.submitForm()}>
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
              {/* </Form> */}
            </FormContainer>
          </MainContent>
        </MainContainer>
        {/* <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer> */}
      </Content>
    </Container>
    <Footer/>
  </AnimationRevealPage>
);
      }
