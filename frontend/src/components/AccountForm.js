import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/lab/Slider";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withStyles } from "@material-ui/core/styles";

import SliderWrapper from "./styles/SliderWrapper";

import { humanReadableDataUnits } from "../lib/humanReadableDataUnits";

const styles = {
  textfield: {
    minWidth: "312px",
    width: "100%"
  },
  button: {
    marginBottom: "1em"
  },
  slider: {
    padding: "22px 0px"
  }
};

class AccountForm extends React.Component {
  state = {
    showPassword: false
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const {
      touched,
      values,
      errors,
      classes,
      handleChange,
      handleBlur,
      setFieldTouched,
      setFieldValue,
      domains
    } = this.props;

    return (
      <form>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <TextField
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username}
              label="Username"
              name="username"
              placeholder="user"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.textfield}
              margin="dense"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.textfield}>
              <InputLabel htmlFor="domains">Domain</InputLabel>
              <Select
                error={touched.domain && !!errors.domain}
                name="domain"
                value={values.domain}
                onChange={e => setFieldValue("domain", e.target.value)}
                onBlur={() => setFieldTouched("domain", true)}
                input={<Input />}
                margin="dense"
              >
                {domains.map(domain => (
                  <MenuItem key={domain.id} value={domain.domain}>
                    {domain.domain}
                  </MenuItem>
                ))}
              </Select>
              {touched.domain &&
                errors.domain && (
                  <FormHelperText>{errors.domain}</FormHelperText>
                )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              label="Password"
              name="password"
              type={this.state.showPassword ? "text" : "password"}
              value={values.password || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.textfield}
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <SliderWrapper>
              <TextField
                error={touched.quota && !!errors.quota}
                helperText={touched.quota && errors.quota}
                label="Quota"
                name="quota"
                type="number"
                placeholder="1024"
                value={values.quota}
                onChange={handleChange}
                className={classes.textfield}
                margin="dense"
              />
              <Typography variant="body1">
                Quota: <strong>{humanReadableDataUnits(values.quota)}</strong>
              </Typography>
              <Slider
                className="slider"
                aria-labelledby="quota-label"
                name="quota"
                classes={{ container: classes.slider }}
                value={+values.quota}
                min={0}
                max={51200}
                step={1024}
                onChange={(e, value) => setFieldValue("quota", value)}
                onBlur={() => setFieldTouched("quota", true)}
              />
            </SliderWrapper>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={values.enabled}
                  onChange={(event, checked) =>
                    setFieldValue("enabled", checked)
                  }
                />
              }
              label="Enabled"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={values.sendonly}
                  onChange={(event, checked) =>
                    setFieldValue("sendonly", checked)
                  }
                />
              }
              label="Sendonly"
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(AccountForm);
