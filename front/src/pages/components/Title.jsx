import PropTypes from "prop-types";

export function Title({ title }) {
  return <h1>{title}</h1>;
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
