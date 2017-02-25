const { mount, shallow } = require('enzyme');
const fetch = require('node-fetch');
const fetchMock = require('fetch-mock');
const expect = require('expect');
const React = require('react');
const sinon = require('sinon');
import Dashboard from '../client/src/components/Dashboard.jsx';
import ShowProject from '../client/src/components/ShowProject';

global.fetch = fetch;
fetchMock.get('*', { hello: 'world' });
fetchMock.patch('*', { hello: 'world' });

describe('Front-end', () => {
  let wrapper;
  describe('Dashboard', (done) => {
    it('Should call componentDidMount', () => {
      sinon.spy(Dashboard.prototype, 'componentDidMount');
      wrapper = mount(<Dashboard appState={{ projects: [] }} fetchProjects={()=>{}}/>);
      expect(Dashboard.prototype.componentDidMount.calledOnce).toEqual(true);
    });

    it('Should call fetchProjects', () => {
      const fakeFetchProjects = sinon.spy();
      wrapper = mount(<Dashboard appState={{ projects: [{}] }} fetchProjects={fakeFetchProjects}/>);
      expect(fakeFetchProjects.calledOnce).toEqual(true);
    });

    it('Should render all projects', () => {
      wrapper = mount(<Dashboard appState={{ projects: [{id:1, percentProgress:20}, {id:2, percentProgress:10}] }} fetchProjects={()=>{}}/>);
      expect(wrapper.find('Link').length).toEqual(2);
    });
  });
  describe('ShowProject', () => {
    it('Should render all tasks', () => {
      wrapper = mount(<ShowProject params={{id:2}}/>);
      wrapper.setState({ project: {tasks: [{ id: 1, completed: true }, { id: 2, completed: false }]}});
      expect(wrapper.find('li').length).toEqual(2);
    });

    it('Should fire toggle function on change of checkbox', () => {
      sinon.spy(ShowProject.prototype, 'toggleCompletionAndUpdateProgress');
      wrapper = mount(<ShowProject params={{ id: 2 }}/>);
      wrapper.setState({ project: {tasks: [{ id: 1, completed: true }]}});
      wrapper.find('input[type="checkbox"]').simulate('change');
      expect(ShowProject.prototype.toggleCompletionAndUpdateProgress.calledOnce).toEqual(true);
    });
  });
});