import { fireEvent, render, screen } from "@testing-library/react";
import InputNumber from "../InputNumber";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validSchema = yup.object().shape({
  testField: yup.number().required("required"),
});

const FormWrapper = () => {
  const { ...methods } = useForm({
    resolver: yupResolver(validSchema),
    mode: "onChange",
    defaultValues: {
      testField: null,
    },
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit()}>
        <InputNumber
          name="testField"
          label="Test"
          control={methods.control}
        ></InputNumber>
        <button type="submit">Send</button>
      </form>
    </FormProvider>
  );
};

describe("InputNumber test cases", () => {
  test("basic rendering", () => {
    render(<FormWrapper />);
    const input = screen.getByTestId("input-testField");
    expect(input).toBeVisible();
  });
  test("formatting", async () => {
    render(<FormWrapper />);
    const input = screen.getByTestId("input-testField");

    fireEvent.change(input, { target: { value: "18" } });
    expect(input.value).toBe("18");
  });
  test("error state", async () => {
    render(<FormWrapper />);
    // submit an empty required field to trigger error state
    const send = screen.getByRole("button");
    fireEvent.click(send);

    const error = await screen.findByText("required");
    expect(error).toBeVisible();
  });
});
