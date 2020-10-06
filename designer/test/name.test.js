import React from 'react'
import { mount } from 'enzyme'
import * as Code from '@hapi/code'
import * as Lab from '@hapi/lab'
import Name from '../client/name'
import sinon from 'sinon'
const { expect } = Code
const lab = Lab.script()
exports.lab = lab
const { suite, test, describe } = lab

suite('Name component', () => {
  describe('with component prop', () => {
    test('renders with correct values', () => {
      const component = { type: 'TextField', name: 'myComponent', title: 'My component' }
      const wrapper = mount(<Name component={component} id={'an-id'} labelText={'label text'} hint={'nudge nudge'}/>)
      const name = wrapper.find('Name')
      expect(name.state()).to.include({ name: 'myComponent', nameHasError: false })
      const field = name.find('#an-id').hostNodes()
      expect(field.exists()).to.equal(true)
      expect(field.props().value).to.equal(component.name)
      expect(name.find('.govuk-label').text()).to.equal('label text')
      expect(name.find('.govuk-hint').text()).to.equal('nudge nudge')
      expect(name.state()).to.equal({ name: component.name, nameHasError: false })
    })
    test('update method is called with correct param', () => {
      const component = { type: 'TextField', name: 'myComponent', title: 'My component' }
      const updateModelSpy = sinon.spy()
      const wrapper = mount(<Name component={component} id={'an-id'} labelText={'label text'} updateModel={updateModelSpy}/>)
      const field = wrapper.find('#an-id').hostNodes()
      field.simulate('change', { target: { value: 'beepboop' } })
      expect(updateModelSpy.calledOnce).to.equal(true)
      expect(updateModelSpy.firstCall.firstArg).to.include({ type: 'TextField', name: 'beepboop', title: 'My component' })
    })
    test('update method is not called when there is an error', () => {
      const component = { type: 'TextField', name: 'myComponent', title: 'My component' }
      const updateModelSpy = sinon.spy()
      const wrapper = mount(<Name component={component} id={'an-id'} labelText={'label text'} updateModel={updateModelSpy}/>)
      const field = wrapper.find('#an-id').hostNodes()
      field.simulate('change', { target: { value: 'beep boop' } })
      expect(updateModelSpy.callCount).to.equal(0)
    })
  })
  describe('Without component prop', () => {
    test('renders correctly with all props provided', () => {
      const wrapper = mount(<Name id={'an-id'} labelText={'label text'} name={'myComponent'} hint={'a hint'}/>)
      const name = wrapper.find('Name')
      const field = wrapper.find('#an-id').hostNodes()
      expect(field.exists()).to.equal(true)
      expect(field.props().value).to.equal('myComponent')
      expect(wrapper.find('.govuk-label').text()).to.equal('label text')
      expect(wrapper.find('.govuk-hint').text()).to.equal('a hint')
      expect(name.state()).to.equal({ name: 'myComponent', nameHasError: false })
    })
  })
  test('Error message shows up when whitespaces are entered', () => {
    const wrapper = mount(<Name component={{ type: 'TextField', name: 'myComponent', title: 'My component' }} id={'an-id'} labelText={'label text'}/>)
    const field = wrapper.find('#an-id').hostNodes()
    field.simulate('change', { target: { value: `this${randomWhitespaceCharacter()}value${randomWhitespaceCharacter()}has dif${whitespaceCharacters.join('')}ferent spaces${randomWhitespaceCharacter()} in it` } })
    wrapper.update()
    expect(wrapper.find('.govuk-input--error').exists()).to.equal(true)
    expect(wrapper.find('.govuk-form-group--error').exists()).to.equal(true)
    expect(wrapper.find('.govuk-error-message').exists()).to.equal(true)
  })
})

const whitespaceCharacters = ['\u0020',
  '\u00A0',
  '\u2000',
  '\u2001',
  '\u2002',
  '\u2003',
  '\u2004',
  '\u2005',
  '\u2006',
  '\u2007',
  '\u2008',
  '\u2009',
  '\u200A',
  '\u2028',
  '\u205F',
  '\u3000']

const randomWhitespaceCharacter = () => {
  return whitespaceCharacters[Math.floor(Math.random() * whitespaceCharacters.length)]
}