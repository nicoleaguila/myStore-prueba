import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Products from '@/components/Products.vue'
import dummyStore from './mocks/store'
import vuex from 'vuex'

const localVue = createLocalVue() // permite cargar pluggins
localVue.use(vuex)
const store = new vuex.Store(dummyStore) // dummy store es un store falso para hacer pruebas


describe('Products.vue', () => {
  it('Muestra el titulo "Nuestros Productos"', () => {
    const title = 'Nuestros Productos'
    const wrapper = shallowMount(Products, {})
    expect(wrapper.find('h1').text()).to.include(title)
  }),
  it('Muestra los productos', () => {
    const productName = 'Computadora'
    const wrapper = shallowMount(Products, {data (){
      return {
        products: [{
          name: 'Computadora',
          price: 100.0,
          qty: 1,
        }]
      }
    }
  })
    expect(wrapper.text()).to.include(productName)
  }),
  it('Filtra los productos', () => {
    const productName = 'Computadora'
    const productSearch = 'Teclado'
    const wrapper = shallowMount(Products, {})
    const searchBox = wrapper.find('input')
    wrapper.vm.products = [{
      name: 'Computadora',
      price: 100.0,
      qty: 1,
    }]
    searchBox.setValue(productSearch)
    expect(wrapper.text()).to.not.include(productName)
  }),
  it('Filtra los productos independiente de mayuscula y minuscula', () => {
    const productSearch = 'computadora'
    const wrapper = shallowMount(Products, {})
    const searchBox = wrapper.find('input')
    wrapper.vm.products = [{
      name: 'Computadora',
      price: 100.0,
      qty: 1,
    }]
    searchBox.setValue('teclado') // esta colocando la palabra teclado en el input
    expect(wrapper.text()).to.not.include(productSearch)// espera que el texto computadora no este
    searchBox.setValue(productSearch)
    expect(wrapper.text()).to.include('Computadora')// espera que el texto computadora
  }),
  it('Añade los productos al carro', () => {
    const wrapper = shallowMount(Products, {})
    const clickMethodStub = sinon.stub()
    const product = {
      name: 'Computadora',
      price: 100.0,
      qty: 1,
    }
    wrapper.vm.products = [product]
    wrapper.setMethods({
      addToCart: clickMethodStub // clickmethod es un doble para hacer la prueba
    })
    const addButton = wrapper.find('.card .button') // encontrar button 
    addButton.trigger('click') // hacer que clickee
    expect(clickMethodStub.calledWith(product)).to.equal(true) // se espera que el stub sea igual a true
  }),
  it('Añade los productos al store', () => {
    const wrapper = shallowMount(Products, {localVue, store})
    const product = {
      name: 'Computadora',
      price: 100.0,
      qty: 1,
    }
    wrapper.vm.products = [product]
    const addButton = wrapper.find('.card .button') // encontrar button 
    addButton.trigger('click')
    expect(store.state.shoppingCart.list.length).to.equal(1)
    expect(store.state.shoppingCart.total).to.equal(100.0)
  })
})
