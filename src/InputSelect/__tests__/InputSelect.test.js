import { fireEvent, render, screen } from "@testing-library/react";
import InputSelect from "../InputSelect";
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
        <InputSelect
          name="testField"
          label="Test"
          options={[
            { value: "A", label: "A" },
            { value: "B", label: "B" },
          ]}
          control={methods.control}
        ></InputSelect>
        <button type="submit">Send</button>
      </form>
    </FormProvider>
  );
};

describe("InputSelect test cases", () => {
  test("basic rendering", () => {
    render(<FormWrapper />);

    const selectWrapper = screen.getAllByRole("button")[0];
    expect(selectWrapper).toBeVisible();
  });

  test("selection", () => {
    render(<FormWrapper />);

    const selectWrapper = screen.getAllByRole("button")[0];
    fireEvent.mouseDown(selectWrapper);
    const optionA = screen.getByText("A");
    fireEvent.click(optionA);

    expect(optionA.selected).toBeTruthy();
  });

  test("error state", async () => {
    render(<FormWrapper />);
    // submit an empty required field to trigger error state
    const send = screen.getAllByRole("button")[1];
    fireEvent.click(send);

    const error = await screen.findByText("required");
    expect(error).toBeVisible();
  });
});
