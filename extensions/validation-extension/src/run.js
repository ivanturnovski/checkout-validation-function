// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const errors = [];

  // input.cart.deliveryGroups.forEach((group) => {
  // console.log(group.deliveryAddress?.address1);

  const provinceCode =
    input.cart.deliveryGroups[0]?.deliveryAddress?.provinceCode;

  /* if (provinceCode) {
    if (provinceCode === "CA") {
      console.log("CA is now allowed!");
      errors.push({
        localizedMessage: "Warning: Cancer and reproductive harm!!!",
        target: "$.cart.deliveryGroups[0].deliveryAddress.provinceCode",
      });
    }
  } */

  input.cart.lines.forEach((lineItem) => {
    const { merchandise } = lineItem;
    const ship_to_ca = merchandise?.product?.ship_to_ca?.value;

    if (provinceCode === "CA" && ship_to_ca == "false") {
      const handle = merchandise?.product.handle;
      const words = handle.split("-");
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      const formattedHandle = capitalizedWords.join(" ");
      errors.push({
        localizedMessage: `Warning: Cancer and reproductive harm - ${formattedHandle}`,
        target: "cart",
      });
    }
  });
  // });

  return {
    errors,
  };
}
