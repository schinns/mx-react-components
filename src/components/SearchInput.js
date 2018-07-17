const PropTypes = require('prop-types');
const React = require('react');

import { withTheme } from './Theme';
const Icon = require('./Icon');
const Input = require('./SimpleInput');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class SearchInput extends React.Component {
  static propTypes = {
    baseColor: PropTypes.string,
    elementRef: PropTypes.func,
    focusOnLoad: PropTypes.bool,
    handleResetClick: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    searchKeyword: PropTypes.string,
    style: PropTypes.object,
    styles: PropTypes.object,
    theme: themeShape
  };

  static defaultProps = {
    onBlur: () => {},
    onChange: () => {},
    placeholder: 'Search'
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);
    const searchIconProps =
      { size: 20, style: styles.searchIcon };
    const closeIconProps =
      { size: 20, style: styles.closeIconIcon };

    return (
      <div className='mx-search-input' style={Object.assign({}, styles.component, this.props.style)}>
        <Input
          elementProps={{
            onBlur: this.props.onBlur,
            onChange: this.props.onChange,
            placeholder: this.props.placeholder,
            type: 'text',
            value: this.props.searchKeyword
          }}
          elementRef={this.props.elementRef}
          focusOnLoad={this.props.focusOnLoad}
          handleResetClick={this.props.handleResetClick}
          prefix={
            <Icon
              elementProps={{
                onClick: () => this.props.elementRef && this.props.elementRef.focus()
              }}
              type='search'
              {...searchIconProps}
            />
          }
          resetClick={this.props.handleResetClick}
          suffix={
            <Icon
              elementProps={{ onClick: this.props.handleResetClick }}
              type='close-solid'
              {...closeIconProps}
            />
          }
          theme={theme}
        />
      </div>
    );
  }

  styles = (theme) => {
    return Object.assign({}, {
      component: {
        display: 'inline-block',
        width: '100%'
      },
      searchIcon: {
        paddingRight: 7,
        fill: theme.Colors.PRIMARY
      },
      closeIcon: {
        paddingLeft: theme.Spacing.XSMALL,
        fill: theme.Colors.GRAY_300,
        cursor: 'pointer'
      }
    }, this.props.styles);
  };
}

module.exports = withTheme(SearchInput);
