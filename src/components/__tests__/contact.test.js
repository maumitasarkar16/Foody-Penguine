import { render , screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "../Contact"

test("should load the contact page", () => {
    render(<Contact />);
    //const heading = screen.getByRole("heading");
    const heading = screen.getByTestId("contact-us")
    console.log("heading---",heading)
    //Assertion
    expect(heading).toBeInTheDocument();


    
})