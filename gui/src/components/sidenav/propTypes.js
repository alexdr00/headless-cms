import { string, arrayOf, shape } from 'prop-types';

// In order to avoid repetition,
// the PropTypes needed in several sidenav subcomponents will be stored here.

export const linkType = {
  to: string.isRequired,
  label: string.isRequired,
  icon: string,
  iconType: string,
};

export const linksStructureType = {
  links: arrayOf(shape(linkType)).isRequired,
};
