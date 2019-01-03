import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidenav from '../Sidenav';
import MenuButton from '../MenuButton';
import NavLinksSection from '../NavLinksSection';

const testLinks = [
  {
    to: '/testRoute',
    label: 'Test Route',
  },
  {
    to: '/testRouteTwo',
    label: 'Test Route Two',
  },
];

let sidenavWrapper;

beforeAll(() => {
  const wrapper = mount(
    <Router>
      <Sidenav links={testLinks} />
    </Router>,
  );

  sidenavWrapper = wrapper.find(Sidenav);
});

describe('Side Navigation', () => {
  it('Collapses navigation when hamburger button is clicked', () => {
    sidenavWrapper.find(MenuButton).simulate('click');

    expect(sidenavWrapper.state().isCollapsed).toBe(true);
  });

  it('Renders the right number of links', () => {
    const navLinksSection = sidenavWrapper.find(NavLinksSection).find('ul');
    const numberOfLinks = navLinksSection.children().length;

    expect(numberOfLinks).toBe(2);
  });
});
