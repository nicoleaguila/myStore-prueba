import { expect } from 'chai'
import { shallowMount} from '@vue/test-utils'
import Login from '@/views/Login.vue'
import sinon from 'sinon'
import {Auth} from '@/services/Auth'

describe('Login.vue', () => {
it('muestra error si login falla', async() => {
  const wrapper = shallowMount(Login)
  const login = {
      message: 'wrong user or password ',
      status: 401
     }
   sinon.stub(Auth, 'login').rejects(login)
   wrapper.setData({
     credentials: {
       email: 'hola@gmail.com',
       password: '964548'
     }
   })
   wrapper.find('button').trigger('click')
   await wrapper.vm.$nextTick()
   expect(wrapper.text()).to.include('Usuario o Contraseña incorrectos, Intente nuevamente.')
  })
})
