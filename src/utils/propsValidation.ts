export default function propsValidation(
  props: object,
  propName: string,
  componentName: string
) {
  if (typeof props === "object") {
    return null;
  }
  return new Error(`Invalid prop ${propName} supplied to ${componentName}`);
}
