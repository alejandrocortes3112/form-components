import { fireEvent, render, screen } from "@testing-library/react";
import InputText from "../InputText";
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
        <InputText
          name="testField"
          label="Test"
          control={methods.control}
        ></InputText>
        <button type="submit">Send</button>
      </form>
    </FormProvider>
  );
};

describe("InputText test cases", () => {
  test("basic rendering", () => {
    render(<FormWrapper />);
    const input = screen.getByTestId("input-testField");
    expect(input).toBeVisible();
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
