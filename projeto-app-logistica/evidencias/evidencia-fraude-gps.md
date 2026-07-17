# 📎 Evidência: Bloqueio de Geofencing e Prevenção de Fraudes (CT-01)

**Data da captura:** 17/07/2026
**Ambiente:** Homologação (Mobile Android) / API de Mapas
**Perfil Simulado:** Entregador / Modal: Bicicleta

### Simulação de Log de Rede (Tentativa de finalização fora da área)

Abaixo está o registro do *payload* (dados) interceptado entre o aplicativo e o servidor no momento em que o botão "Finalizar Entrega" foi acionado fora do raio permitido da cerca virtual.

**Requisição disparada pelo App (`POST /api/v2/deliveries/complete`):**
```json```
{
  "delivery_id": "ORD-88492",
  "courier_id": "COUR-992",
  "vehicle": "BICYCLE",
  "timestamp": "2026-07-17T10:15:30Z",
  "current_location": {
    "latitude": -23.515082,
    "longitude": -47.470125,
    "accuracy_meters": 4.5
  }
}

**Validação do Servidor (Regras de Negócio e Cálculo de Rota):**

    *Destino Real do Pedido: Lat -23.501533, Lng -47.458011 (Região Central)*

    *Distância Calculada pelo GPS: 1.84 km*

    *Tolerância Máxima Permitida (Raio): 0.05 km (50 metros)*

**Resposta da API (HTTP Status 403 Forbidden):**


{
  "status": "error",
  "error_code": "GEO_FENCE_VIOLATION",
  "message": "Ação bloqueada. Você está a 1.84km do destino. Aproxime-se do local exato para finalizar a entrega e liberar o repasse.",
  "action_required": "MOVE_CLOSER"
}

Conclusão do Teste: O sistema funcionou exatamente conforme o esperado no planejamento. O bloqueio evitou a conclusão indevida da corrida, garantindo a integridade dos dados operacionais e prevenindo o repasse de pagamentos baseados em localizações falsas.
