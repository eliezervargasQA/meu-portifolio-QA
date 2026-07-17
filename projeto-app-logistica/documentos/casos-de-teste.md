# 🧪 Casos de Teste: App de Logística (Roteirização e Entregas)

**Técnica Utilizada:** BDD (Behavior Driven Development) - Gherkin
**Plataforma Alvo:** Mobile (Android / iOS)
**Severidade:** Alta (Impacto na operação em campo, confiabilidade de dados e prevenção de fraudes)

---

## 📍 CT-01: Validação de Cerca Virtual (Geofencing) contra Fraudes
**Objetivo:** Garantir que o entregador não consiga finalizar uma corrida remotamente, exigindo que a API de Mapas confirme a presença física no local exato de entrega para liberar o repasse.

> **Dado** que o entregador aceitou uma corrida e está com o status "Em Rota"
> **E** o endereço de destino tem as coordenadas de latitude/longitude registradas no banco de dados
> **Quando** o entregador tenta deslizar o botão "Finalizar Entrega"
> **E** o sinal do GPS do aparelho indica que ele está a 1,2 km de distância do destino (fora do raio de tolerância da cerca virtual de 50 metros)
> **Então** o sistema deve bloquear a ação
> **E** exibir a mensagem de erro: "Você está muito longe do endereço do cliente. Aproxime-se do local exato para finalizar a entrega e liberar seu repasse."
> **E** o status do pedido deve permanecer inalterado no servidor.

---

## 📵 CT-02: [Caminho Triste] Resiliência em Área de Sombra (Modo Offline)
**Objetivo:** Validar o comportamento do aplicativo quando a entrega é concluída em um local sem sinal de internet (ex: elevadores, subsolos de condomínios ou áreas de sombra), garantindo que os dados da corrida não sejam perdidos e a interface não trave.

> **Dado** que o entregador chegou ao destino correto (dentro do raio de 50 metros)
> **E** o aparelho perde subitamente a conexão de dados (simulado ativando o "Modo Avião" no dispositivo de teste)
> **Quando** o entregador desliza o botão "Finalizar Entrega"
> **Então** o aplicativo deve salvar o status e o timestamp (horário exato) localmente no cache do aparelho
> **E** exibir a mensagem visual: "Entrega registrada offline. O sistema será sincronizado assim que houver conexão de rede."
> **E** a tela deve retornar para o mapa inicial permitindo a aceitação de novas rotas pré-carregadas
> **Quando** a conexão de dados 4G/5G for restabelecida
> **Então** o aplicativo deve enviar o pacote de dados em *background* para a API 
> **E** atualizar o status do pedido para "Entregue" no servidor central.
