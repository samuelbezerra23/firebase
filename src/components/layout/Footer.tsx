export function Footer() {
  return (
    <footer className="bg-card text-center py-8 mt-auto border-t">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Comunidade Ativa. Todos os direitos reservados.
      </p>
    </footer>
  );
}
