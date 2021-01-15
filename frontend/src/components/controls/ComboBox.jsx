import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const ComboBox = (props) => {
    const {
        label,
        className,
        onChange,
        required = false,
        getOptionLabel,
        renderOption,
        options } = props;

    return (
        <Autocomplete
            options={options}
            onChange={(event, value) => onChange && onChange(value)}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            renderInput={(params) =>
                <TextField
                    className={className}
                    {...params}
                    label={label}
                    required={required}
                    variant="outlined"
                    size="small"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            }
        />
    );
};

export default ComboBox;