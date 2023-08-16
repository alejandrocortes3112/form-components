import { fireEvent, render, screen } from "@testing-library/react";
import InputPattern from "../InputPattern";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validSchema = yup.object().shape({
  phone: yup.string().required("required"),
});

const FormWrapper = () => {
  const { ...methods } = useForm({
    resolver: yupResolver(validSchema),
    mode: "onChange",
    defaultValues: {
      phone: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit()}>
        <InputPattern
          name="phone"
          format="(###) ###-####"
          allowEmptyFormatting
          mask="_"
          label="Phone"
          control={methods.control}
        ></InputPattern>
        <button type="submit">Send</button>
      </form>
    </FormProvider>
  );
};

describe("InputPattern test cases", () => {
  test("basic rendering", () => {
    render(<FormWrapper />);
    const input = screen.getByTestId("input-phone");
    expect(input).toBeVisible();
  });
  test("formatting", async () => {
    render(<FormWrapper />);
    const input = screen.getByTestId("input-phone");

    fireEvent.change(input, { target: { value: "8004445555" } });
    expect(input.value).toBe("(800) 444-5555");
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
