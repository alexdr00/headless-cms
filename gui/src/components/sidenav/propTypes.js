import { string, arrayOf, shape } from 'prop-types';

// The PropTypes needed in several sidenav subcomponents will be stored here,
// in order to avoid repetition.

export const linkType = {
  to: string.isRequired,
  label: string.isRequired,
  icon: string,
  iconType: string,
};

export const linksStructureType = {
  links: arrayOf(shape(linkType)).isRequired,
};
