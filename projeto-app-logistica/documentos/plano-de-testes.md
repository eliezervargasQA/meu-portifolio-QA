#  Plano de Testes: App de Logística e Entregas (Courier App)

## 1. Introdução e Contexto do Negócio
Este documento define a estratégia de testes para o módulo de **Roteirização e Atualização de Status em Tempo Real** de um aplicativo de entregas sob demanda. O sistema conecta clientes, estabelecimentos e entregadores, exigindo alta precisão de geolocalização e resiliência contra falhas de conexão em áreas de sombra (sem sinal de internet).

## 2. Escopo dos Testes
Os testes focarão nas seguintes funcionalidades críticas:
* **Sincronização de Status:** Transições corretas do ciclo de vida do pedido (Aceito -> Coletado -> Em Rota -> Entregue).
* **Cálculo de Rota e Distância:** Precisão da API de mapas para definir a rota mais curta e o valor do repasse.
* **Resiliência de Rede (Offline Mode):** Comportamento do aplicativo quando o entregador perde o sinal de dados (3G/4G/5G) no momento exato de confirmar a entrega.
* **Tratamento de Cancelamentos:** Fluxo de bloqueio e estorno quando o cliente cancela o pedido com o entregador já em rota.

## 3. Estratégia e Tipos de Testes
* **Testes Exploratórios em Mobile:** Simulação de uso em dispositivos reais (Android/iOS) sob condições variáveis de bateria e rede.
* **Testes de Integração:** Validação dos Webhooks disparados entre o celular do entregador e o servidor central.
* **Simulação de Mock de GPS:** Uso de ferramentas para falsear a localização do dispositivo e testar a precisão do "Geofencing" (cerca virtual de aproximação do destino).

## 4. Riscos Mapeados
1. **Fraude ou Falha de Repasse:** O entregador finalizar a corrida fora do raio de GPS do cliente e o sistema validar indevidamente.
2. **Inconsistência de Dados:** O cliente cancelar o pedido, mas a notificação atrasar, fazendo o entregador ir até o local à toa.
3. **Travamento no App:** O botão de "Finalizar Entrega" não responder devido à perda temporária de pacotes de internet.

## 5. Critérios de Aceite
* O app deve permitir a conclusão da entrega em modo offline (salvando os dados localmente) e sincronizar automaticamente quando o sinal retornar.
* A cerca virtual (Geofence) deve ter uma margem de tolerância máxima de 50 metros para permitir o botão "Cheguei".
