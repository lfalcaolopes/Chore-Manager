'use client';

import styled, { css } from 'styled-components';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  primary: css`
    background-color: #2563eb;
    color: white;
    &:hover {
      background-color: #1d4ed8;
    }
  `,
  secondary: css`
    background-color: #e5e7eb;
    color: #111827;
    &:hover {
      background-color: #d1d5db;
    }
  `,
  text: css`
    background-color: transparent;
    color: #4b5563;
    &:hover {
      color: #111827;
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  `,
  md: css`
    padding: 0.5rem 1rem;
    font-size: 1rem;
  `,
  lg: css`
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  `,
};

const StyledButton = styled.button<Required<Pick<ButtonProps, 'variant' | 'size'>>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ variant }) => variantStyles[variant]}
  ${({ size }) => sizeStyles[size]}

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = ({ children, variant = 'primary', size = 'md', ...props }: ButtonProps) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
