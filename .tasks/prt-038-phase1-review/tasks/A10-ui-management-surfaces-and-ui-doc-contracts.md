# Aspect A10: UI Management Surfaces, UX Lean-ness, and UI Documentation Contracts

Цель:
- проверить, насколько хорошо протокол описывает UI/control-plane surfaces;
- понять, достаточно ли это документировано по стандартам проекта и MBB;
- найти UI overengineering, missing screens/actions/state, или документирование не на уровне проекта.

Что смотреть:
- `PRT-039` и product-local protocols where UI surfaces are described;
- `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`
- product UI specs in SellerAgent and Docoved
- MBB/spec guidance relevant to UI docs

Что искать:
- хватает ли route/screen/action definitions;
- ясно ли, какая информация показывается на экранах и какие действия доступны;
- не дублируется ли информация в разных surfaces;
- нет ли шумных или лишних компонентных слоев;
- достаточно ли ясны boundaries between reusable platform blocks and product IA;
- если UI подразумевается, есть ли требования к identifiers, POM, screen registry, automation contracts и аналогам по стандартам проекта.

Особый фокус:
- control-plane app shell;
- access/membership/channel/source/import management surfaces;
- diagnostics/runs screens;
- product-specific composition over platform primitives;
- сохранение бережливого и понятного operator experience.

Ожидаемый отчет:
- что по UI уже описано хорошо;
- каких UI contracts/docs не хватает;
- какие экраны или действия недоопределены;
- где есть риск сделать UI слишком общим или слишком сложным;
- какие UI-doc deliverables надо явно встроить в protocol.
