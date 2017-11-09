getNamesapces = function() {
    return ['common', 'glossary'];
};

additionalCallback = function() {
    
    // 3 days from now
    displayDeliveryInfo("demo1", "glossary:deliveryDate", { date_distance: 3 });
    
    // today
    displayDeliveryInfo("demo2", "glossary:deliveryDate", { context: "today" });
    
    // 5 days late
    let options = {
        context: "late",
        date_distance: 5
    };
    displayDeliveryInfo("demo3", "glossary:deliveryDate", options);
    
    $("#langSelector").change(function(){
        console.log("changed");
        let lng = $("select option:selected").val();
        console.log(lng);
        i18next.changeLanguage(lng, Common.updateContent);
    })
};

displayDeliveryInfo = function(id, msg_key, options) {
    $("#" + id)
        .attr("data-i18n", "[html]" + msg_key)
        .localize(options);
};

"select option:selected"