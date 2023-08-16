import { fireEvent, render, screen, within } from "@testing-library/react";
import InputRadio from "../InputRadio";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validSchema = yup.object().shape({
  testField: yup.string().required("required"),
});

const FormWrapper = () => {
  const { ...methods } = useForm({
    resolver: yupResolver(validSchema),
    mode: "onChange",
    defaultValues: {
      testField: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit()}>
        <InputRadio
          name="testField"
          label="Test"
          options={[
            { value: "A", label: "A" },
            { value: "B", label: "B" },
          ]}
          control={methods.control}
        ></InputRadio>
        <button data-testid="submit" type="submit">
          Send
        </button>
      </form>
    </FormProvider>
  );
};

describe("InputRadio test cases", () => {
  test("basic rendering", () => {
    render(<FormWrapper />);

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toBeVisible();
  });

  test("selection", () => {
    render(<FormWrapper />);

    const radioGroup = screen.getByRole("radiogroup");

    const optionA = within(radioGroup).getByLabelText("A");
    fireEvent.click(optionA);
    expect(optionA.checked).toEqual(true);
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
