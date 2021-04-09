function PortraitClicked() {
    // TODO: ctrl and alt click support
    Players.PlayerPortraitClicked($.GetContextPanel().GetAttributeInt("player_id", -1), false, false);
    //$.Msg("click", $.GetContextPanel().GetAttributeInt( "player_id", -1 ));
}

function Destroy() {
    if (GameUI.CustomUIConfig().CustomDropDown.OpenFor != $.GetContextPanel()) {
        $.GetContextPanel().RemoveClass("active");
        $.GetContextPanel().ClearActive();
        CloseCustomDropDown();
    }
}

function OnHeroChanged() {
    GameEvents.SendCustomGameEventToServer("ChangeHeroButtonPressed", {
        pID: $.GetContextPanel().GetAttributeInt("player_id", -1),
        PlayerID: $.GetContextPanel().GetAttributeInt("player_id", -1),
        selectedHero: $('#HeroDropDown').GetSelected().id
    });
}

function SelectHero(data) {
    GameUI.SelectUnit(data.entId, false);
}

function OpenCustomDropDown() {
    GameUI.CustomUIConfig().CustomDropDown.OpenFor = $.GetContextPanel();
    var CustomDropDown = GameUI.CustomUIConfig().CustomDropDown;
    var pos = CustomDropDown.GetAbsoluteOffset($.GetContextPanel(), $("#HeroCustomDropDown"));
    CustomDropDown.SetPos(pos);
    CustomDropDown.OnHeroSelected = OnHeroSelected;
    CustomDropDown.OnClose = OnClose;
    CustomDropDown.Open();
}

function CloseCustomDropDown() {
    GameUI.CustomUIConfig().CustomDropDown.Close();
}

function OnHeroSelected(heroId, heroName) {
    $("#HeroCustomDropDownLabel").text = heroName;
    GameEvents.SendCustomGameEventToServer("ChangeHeroButtonPressed", {
        pID: $.GetContextPanel().GetAttributeInt("player_id", -1),
        PlayerID: $.GetContextPanel().GetAttributeInt("player_id", -1),
        selectedHero: heroId
    });
    $("#HeroCustomDropDown").SetFocus();
}

function OnClose() {
    if ($.GetContextPanel().BHasClass("active")) {
        $("#HeroCustomDropDown").SetFocus();
    }
}

(function() {
    var selectedHero = GameUI.CustomUIConfig().CustomDropDown.heroAliases[Players.GetPlayerSelectedHero($.GetContextPanel().GetAttributeInt("player_id", -1))];
    if (selectedHero) {
        $('#HeroCustomDropDownLabel').text = selectedHero.name;
    }
    GameEvents.Subscribe("select_hero", SelectHero);
})();