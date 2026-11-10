# Pingo - Assistente

Web app da Terrão TV: agenda de campeonatos, caixa da temporada e equipe, guiado pelo Pingo.

**Para instalar no iPhone:** abra o link do app no Safari, toque em Compartilhar e depois em **Adicionar à Tela de Início**.
**No Android:** abra no Chrome e toque em **Instalar app** (ou use o APK).

Os dados ficam no Supabase, com login por e-mail e senha e acesso por papel (dono, sócio, funcionário).

**Atualizações:** o app confere `versao.json`. Quando `web` aumenta, todos veem o aviso "Atualizar agora". Quando `apk` aumenta, o Android oferece baixar o `Pingo.apk` novo, que instala por cima sem perder dados.

**Widget e notificações (desde a versão 1.2):**
- Android (APK): widget na tela inicial com os dias para o próximo campeonato, se você está escalado e o caixa (só para quem pode ver o caixa). As notificações e o widget atualizam a cada ~15 minutos, e na hora quando você sai do app.
- iPhone (Pingo na Tela de Início, iOS 16.4+) e Chrome: notificações em 1 ou 2 minutos, ligadas em Perfil → Notificações.
- Cada pessoa só recebe aviso do que pode ver, nunca do que ela mesma fez, e escolhe os tipos (agenda, caixa, equipe).
- O envio é feito pela função `avisos` do Supabase, chamada pelo `pg_cron` a cada minuto; `sw.js` mostra a notificação no navegador.
