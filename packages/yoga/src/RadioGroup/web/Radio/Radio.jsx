import React, { useContext } from 'react';
import { bool, oneOfType, string, number, shape } from 'prop-types';
import styled from 'styled-components';
import { hexToRgb } from '@gympass/yoga-common';

import RadioGroupContext from '../../RadioGroupContext';
import { HiddenInput } from '../../../shared';

const Radio = styled.span`
  position: relative;

  display: block;

  ${({
    theme: {
      yoga: {
        components: { radioGroup },
      },
    },
  }) =>
    `
      width: ${radioGroup.radio.size}px;
      height: ${radioGroup.radio.size}px;

      border-width: ${radioGroup.radio.size * 0.1}px; 
      border-style: solid;
      border-color: ${radioGroup.radio.backgroundColor};
      border-radius: ${radioGroup.radio.border.radius}px;
    `}
`;

const Input = styled(HiddenInput)`
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: relative;

  ${({
    checked,
    disabled,
    theme: {
      yoga: {
        components: { radioGroup },
      },
    },
  }) =>
    `
    width: ${radioGroup.radio.size}px;
    height: ${radioGroup.radio.size}px;

    &:hover {
      ${Input} {
        cursor: pointer;
      }
      ${Radio} {
        box-shadow: 0 0 0 ${radioGroup.radio.size * 0.4}px ${hexToRgb(
      radioGroup.hover.backgroundColor,
      0.25,
    )};
      }
    }

    ${
      checked
        ? `
    
      &:hover {
        ${Radio} {
        box-shadow: 0 0 0 ${radioGroup.radio.size * 0.4}px ${hexToRgb(
            radioGroup.checked.hover.backgroundColor,
            0.25,
          )};
        }
      }
    
      &:focus-within {
        ${Radio} {
        box-shadow: 0 0 0 ${radioGroup.radio.size * 0.4}px ${hexToRgb(
            radioGroup.checked.hover.backgroundColor,
            0.5,
          )};
        }
      }
    
      &:active {
        ${Radio} {
        box-shadow: 0 0 0 ${radioGroup.radio.size * 0.4}px ${hexToRgb(
            radioGroup.checked.hover.backgroundColor,
            0.75,
          )};
        }
      }

      ${Radio} {
        border-color: ${radioGroup.checked.backgroundColor};

        &:after {
          position: absolute;
          top: 50%;
          left: 50%;

          width: ${radioGroup.radio.size * 0.5}px;
          height: ${radioGroup.radio.size * 0.5}px;
          
          border-radius: 100%;
          background-color: ${radioGroup.checked.backgroundColor};
          
          transform: translate(-50%, -50%);
          
          content: '';
        }
      }
    `
        : ''
    }

    ${
      disabled
        ? `
        ${Radio} {
          border-color: ${radioGroup.disabled.backgroundColor};
        }

        &:hover {
          ${Input} {
            cursor: not-allowed;
          }
          ${Radio} {
            box-shadow: none;
          }
        }
      `
        : ``
    }

    ${
      disabled && checked
        ? `
          ${Radio}:after {
            background-color: ${radioGroup.disabled.backgroundColor};
          }
        `
        : ''
    }
  `}
`;

/** The Radio is a type of selection control that allows the user to select a
 * single option from a list.  */
const RadioGroupRadio = ({ value, disabled, style, className, ...rest }) => {
  const { name, onChange, selectedValue, ...context } = useContext(
    RadioGroupContext,
  );

  const inputValue = value;
  const checked = inputValue === selectedValue;

  return (
    <Wrapper
      {...{
        checked,
        disabled,
        style,
        className,
      }}
    >
      <Radio checked={checked} />
      <Input
        type="radio"
        {...{
          value,
          checked,
          name,
          onChange,
          disabled,
        }}
        {...rest}
        {...context}
      />
    </Wrapper>
  );
};

RadioGroupRadio.displayName = 'RadioGroup.Radio';

RadioGroupRadio.propTypes = {
  className: string,
  disabled: bool,
  style: shape({}),
  value: oneOfType([string, number]),
};

RadioGroupRadio.defaultProps = {
  className: undefined,
  disabled: false,
  style: {},
  value: '',
};

export default RadioGroupRadio;
