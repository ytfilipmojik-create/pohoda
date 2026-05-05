import { Html, Head, Body, Container, Text, Heading, Link } from "@react-email/components";

export function StartedReadingEmail({ name }: { name: string | null }) {
  const greeting = name ? `Ahoj ${name},` : "Ahoj,";
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#f5f5f3", padding: 24 }}>
        <Container
          style={{ background: "white", borderRadius: 12, padding: 32, maxWidth: 560 }}
        >
          <Heading style={{ color: "#1a1f3a", fontSize: 22, marginTop: 0 }}>
            Jen jsem chtěl zkontrolovat
          </Heading>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.7 }}>
            {greeting}
            <br />
            <br />
            Včera jsi koupil e-book. Jen jsem zvědavý — stihl jsi se aspoň podívat?
          </Text>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.7 }}>
            Kdyby ti něco nesedělo nebo jsi měl jakoukoliv otázku, prostě{" "}
            <strong>odpověz na tento e-mail</strong>. Píšu si s každým osobně.
          </Text>
          <Text style={{ color: "#555", fontSize: 14, marginTop: 24 }}>
            Filip
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
