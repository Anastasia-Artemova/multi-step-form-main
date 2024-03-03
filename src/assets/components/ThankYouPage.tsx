import { Heading, Image, Text } from "@chakra-ui/react";

const ThankYouPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginTop: "30%",
      }}
    >
      <Image
        src="/public/static/images/icon-thank-you.svg"
        boxSize="50px"
        marginBottom="15px"
      />
      <Heading fontWeight="bold" color="hsl(213, 96%, 18%)">
        Thank you!
      </Heading>
      <Text style={{ color: "hsl(231, 11%, 63%)", fontSize: "14px" }}>
        Thanks for confirming your subscription! We hope you have <br />
        fun using out platform. If you ever needsupport, please feel
        <br />
        free to email us at support@loremgaming.com.
      </Text>
    </div>
  );
};

export default ThankYouPage;
