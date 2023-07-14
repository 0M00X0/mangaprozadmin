import * as yup from "yup";
const nowyear = new Date().getFullYear();
const seriesSchema = yup.object().shape({
  seriesname: yup.string().required("Required"),
  seriesdescription: yup.string().required("Required"),
  seriesalternativenames: yup.string().required("Required"),
  seriesauthor: yup.string().required("Required"),
  seriesartist: yup.string().required("Required"),
  seriesyear: yup
    .string()
    .matches(/^\d{4}$/, "Must be a valid year")
    .test("valid-year", "Year cannot be greater than current year", (value) => {
      if (value) {
        const enteredYear = parseInt(value, 10);
        return enteredYear <= nowyear;
      }
      return true;
    })
    .required("Required"),
  seriesserialization: yup.string().required("Required"),
  seriesscore: yup
    .string()
    .matches(/^\d{1,2}(\.\d{1,2})?$/, "Must be 1 or 2 Numbers")
    .required("Required"),
  seriesthumbnail: yup
    .string()
    .matches(
      /\.(jpg|png|jpeg|gif|webp)$/,
      "Must be a valid image (jpg or png or jpeg or gif or webp)"
    )
    .required("Required"),
  seriescover: yup
    .string()
    .matches(
      /\.(jpg|png|jpeg|gif|webp)$/,
      "Must be a valid image (jpg or png or jpeg or gif or webp)"
    )
    .required("Required"),
    seriesgenres: yup
    .array()
    .of(yup.object().shape({
      id: yup.string().required("Required"),
      name: yup.string().required("Required")
    }))
    .required("Required"),
  seriestype: yup.string().required("Required"),
  seriesstatus: yup.string().required("Required"),
});

export default seriesSchema;
