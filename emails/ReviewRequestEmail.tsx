import { Html, Head, Body, Container, Heading, Text, Link } from "@react-email/components";

export function ReviewRequestEmail({ name }: { name: string | null }) {
  const greeting = name ? `Ahoj ${name},` : "Ahoj,";
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#f5f5f3", padding: 24 }}>
        <Container
          style={{ background: "white", borderRadius: 12, padding: 32, maxWidth: 560 }}
        >
          <Heading style={{ color: "#1a1f3a", fontSize: 22, marginTop: 0 }}>
            Jak ti to jde?
          </Heading>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.7 }}>
            {greeting}
            <br />
            <br />
            Je to ~10 dní od koupě e-booku. Pokud ti něco z toho pomohlo (nebo naopak chybělo),{" "}
            <strong>odpověz na tenhle mail</strong> — vážně mě zajímá feedback.
          </Text>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.7 }}>
            A pokud ti to bylo užitečné a můžeš sdílet pár vět jako recenzi, hodně mi to pomůže.
            Stačí krátká odpověď, použiju to s tvým souhlasem na webu.
          </Text>
          <Text style={{ color: "#555", fontSize: 14, marginTop: 24 }}>
            Díky, Filip
            <br />
            <Link href="https://pohodazdomova.cz" style={{ color: "#1a1f3a" }}>
              pohodazdomova.cz
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
