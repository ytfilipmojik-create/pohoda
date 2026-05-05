import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Section,
  Link,
} from "@react-email/components";

type Props = {
  name: string | null;
  productTitle: string;
  upgradeUrl: string;
  expiresInHours: number;
};

export function UpsellEmail({ name, productTitle, upgradeUrl, expiresInHours }: Props) {
  const greeting = name ? `Ahoj ${name},` : "Ahoj,";
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#f5f5f3", padding: 24 }}>
        <Container
          style={{ background: "white", borderRadius: 12, padding: 32, maxWidth: 560 }}
        >
          <Heading style={{ color: "#1a1f3a", fontSize: 22, marginTop: 0 }}>
            Speciální nabídka jen pro tebe
          </Heading>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.7 }}>
            {greeting}
            <br />
            <br />
            Vidím, že máš {productTitle}. Když si dokoupíš zbylé dva e-booky a bonus, dostaneš to
            za <strong>doplatek 600 Kč</strong> místo plné ceny 798 Kč.
          </Text>
          <Section
            style={{
              background: "#fff8e1",
              borderLeft: "3px solid #ffba08",
              padding: 16,
              borderRadius: 6,
              margin: "16px 0",
            }}
          >
            <Text style={{ margin: 0, fontSize: 14, color: "#1a1a1a" }}>
              <strong>Co dostaneš:</strong> 2 zbylé e-booky + exkluzivní bonus „Jak sehnat
              prvního klienta“ (není dostupný samostatně).
            </Text>
          </Section>
          <Button
            href={upgradeUrl}
            style={{
              background: "#1a1f3a",
              color: "white",
              padding: "12px 20px",
              borderRadius: 6,
              fontSize: 15,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Dokoupit za 600 Kč
          </Button>
          <Text style={{ color: "#888", fontSize: 12, marginTop: 12 }}>
            Nabídka platí {expiresInHours} hodin.
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
