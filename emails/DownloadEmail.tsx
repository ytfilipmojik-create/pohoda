import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
  Section,
  Link,
} from "@react-email/components";

type Props = {
  email: string;
  name: string | null;
  downloads: { title: string; url: string; isBonus?: boolean }[];
  hasBonus: boolean;
};

export function DownloadEmail({ name, downloads, hasBonus }: Props) {
  const greeting = name ? `Ahoj ${name},` : "Ahoj,";
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#f5f5f3", padding: 24 }}>
        <Container
          style={{ background: "white", borderRadius: 12, padding: 32, maxWidth: 560 }}
        >
          <Heading style={{ color: "#1a1f3a", fontSize: 24, marginTop: 0 }}>
            Děkujeme za nákup
          </Heading>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.6 }}>
            {greeting}
            <br />
            <br />
            E-book{downloads.length > 1 ? "y" : ""} máš připravený ke stažení. Linky platí 7 dní —
            ulož si soubory na disk.
          </Text>

          {hasBonus && (
            <Section
              style={{
                background: "#fff8e1",
                borderLeft: "3px solid #ffba08",
                padding: 16,
                marginTop: 16,
                borderRadius: 6,
              }}
            >
              <Text style={{ margin: 0, fontSize: 14, color: "#1a1a1a" }}>
                <strong>Bonus uvnitř:</strong> „Jak sehnat prvního klienta“ — moje vlastní
                techniky shánění klientů.
              </Text>
            </Section>
          )}

          <Hr style={{ margin: "24px 0", borderColor: "#eee" }} />

          {downloads.map((d) => (
            <Section key={d.title} style={{ marginBottom: 12 }}>
              <Text
                style={{
                  margin: "0 0 6px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#1a1f3a",
                }}
              >
                {d.isBonus && (
                  <span
                    style={{
                      color: "#ffba08",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      marginRight: 6,
                    }}
                  >
                    Bonus
                  </span>
                )}
                {d.title}
              </Text>
              <Button
                href={d.url}
                style={{
                  background: "#1a1f3a",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: 6,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                Stáhnout PDF
              </Button>
            </Section>
          ))}

          <Hr style={{ margin: "24px 0", borderColor: "#eee" }} />

          <Text style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
            Kdyby cokoliv — odpověz rovnou na tento e-mail. Píšu si s každým osobně.
            <br />
            <br />
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
