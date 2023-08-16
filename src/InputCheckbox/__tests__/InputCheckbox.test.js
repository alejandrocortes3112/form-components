import { fireEvent, render, screen } from "@testing-library/react";
import InputCheckbox from "../InputCheckbox";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validSchema = yup.object().shape({
  testField: yup.bool().oneOf([true], "required"),
});

const FormWrapper = () => {
  const { ...methods } = useForm({
    resolver: yupResolver(validSchema),
    mode: "onChange",
    defaultValues: {
      testField: false,
    },
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit()}>
        <InputCheckbox
          name="testField"
          label="Test"
          control={methods.control}
        />
        <button data-testid="submit" type="submit">
          Send
        </button>
      </form>
    </FormProvider>
  );
};

describe("InputCheckbox test cases", () => {
  test("basic rendering", () => {
    render(<FormWrapper />);

    const checkbox = screen.getByTestId("checkbox-testField");
    expect(checkbox).toBeVisible();
  });

  test("error state", async () => {
    render(<FormWrapper />);
    // submit an empty required field to trigger error state
    const send = screen.getByTestId("submit");
    fireEvent.click(send);

    const error = await screen.findByText("required");
    expect(error).toBeVisible();
  });
});
