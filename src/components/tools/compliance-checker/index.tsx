import React from "react";
import Container from "@/components/global/container";

const ComplianceChecker = () => {
  return (
    <div className="w-full py-20">
      <Container>
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-heading font-bold">
            Compliance Checker
          </h2>
          <p className="text-muted-foreground mt-4">
            Ensure your support meets industry standards
          </p>
        </div>
        {/* Tool implementation will go here */}
      </Container>
    </div>
  );
};

export default ComplianceChecker;
