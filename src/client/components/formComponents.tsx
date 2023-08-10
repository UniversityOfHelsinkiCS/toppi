import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import React from 'react'
import { Controller, ControllerRenderProps } from 'react-hook-form'

export const FormField = ({
  label,
  name,
  error,
  render,
  control,
  sx,
  required = false,
  pretext,
  onChange,
  disabled = false,
}: {
  label: string
  name: string
  error?: string
  render: (field: ControllerRenderProps) => React.ReactElement
  control: any
  sx?: SxProps
  required?: boolean
  pretext?: string
  onChange?: (ev: any) => void
  disabled?: boolean
}) => (
  <FormControl error={!!error} sx={sx} required={required} disabled={disabled}>
    <FormLabel>{label}</FormLabel>
    {pretext && <FormHelperText>{pretext}</FormHelperText>}
    <Controller
      control={control}
      name={name}
      render={({ field }) => render(field)}
      rules={{
        onChange,
      }}
    />
    <FormHelperText>{error}</FormHelperText>
  </FormControl>
)

export const FormInputField = ({
  label,
  name,
  error,
  control,
  sx,
  required = false,
  type = 'input',
  onChange,
  readOnly = false,
}: {
  label: string
  name: string
  error?: string
  control: any
  sx?: SxProps
  required?: boolean
  type?: React.HTMLInputTypeAttribute
  onChange?: (ev: any) => void
  readOnly?: boolean
}) => (
  <FormField
    label={label}
    name={name}
    error={error}
    control={control}
    required={required}
    sx={sx}
    onChange={onChange}
    render={(field) => <Input {...field} type={type} readOnly={readOnly} required={false} />}
  />
)
