/*
 * Game Develop JS Platform
 * Copyright 2008-2014 Florian Rival (Florian.Rival@gmail.com). All rights reserved.
 * This project is released under the GNU Lesser General Public License.
 */
#if defined(GD_IDE_ONLY) && !defined(GD_NO_WX_GUI)
#include "IntelXDKPackageDialog.h"
#include "GDCore/Tools/Localization.h"

IntelXDKPackageDialog::IntelXDKPackageDialog(wxWindow* parent, wxString packageLocation)
    : BaseIntelXDKPackageDialog(parent)
{
	ID_HYPERLINKCTRL117->SetLabel(_("http://wiki.compilgames.net/doku.php/en/game_develop/tutorials/howtouseintelxdk"));
	packageLocationEdit->SetValue(packageLocation);
}

IntelXDKPackageDialog::~IntelXDKPackageDialog()
{
}

void IntelXDKPackageDialog::OnCloseClicked(wxCommandEvent& event)
{
	EndModal(0);
}
#endif