import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'

import Navbar from '@/components/Navbar.vue'
import Vuex from "vuex"
import dummyStore from './mocks/store'

import VueRouter from 'vue-router'
import dummyRoutes from "./mocks/routes"

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

const store = new Vuex.Store(dummyStore)
const router = new VueRouter(dummyRoutes)

describe('Navbar.vue', () => {
  it('muestra menu de login si está logueado', () => {
    
    const wrapper = mount(Navbar, {
      propsData: {
        title: "Mi Tienda"
      },
      localVue,
      store,
      router,
    })
    store.dispatch('updateUser', undefined) // dispatch es como commit pero para las acciones
    expect(wrapper.text()).to.include('Login')
  }),
  it('muestra menu de usuario si está logueado', () => {
    store.dispatch('updateUser', { email: 'user@mystore.com' })
    const wrapper = mount(Navbar, {
      propsData: {
        title: "Mi Tienda"
      },
      localVue,
      store,
      router,
    })
    expect(wrapper.text()).to.include('Usuario')
    expect(wrapper.text()).to.not.include('Login')
  })
})